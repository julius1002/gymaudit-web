import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { map, delay } from "rxjs/operators";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ExerciseDetailComponent } from '../exercise-detail/exercise-detail.component';

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.scss"],
})
export class ExerciseListComponent implements OnInit {

  @ViewChild(ExerciseDetailComponent) exerciseDetailComponent: ExerciseDetailComponent;

  selectedExercise: Exercise;
  exercises$: Observable<Exercise[]>;
  unitId$: Observable<string>;
  faPlus = faPlus;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("id"))
    );
    this.getExercisesFromUnit();
    }

  public getExercisesFromUnit(): void {
    this.unitId$.subscribe(
      (unitId) =>
        (this.exercises$ = this.exerciseService.getExercisesOfUnitOfTrainee(
          environment.TRAINEEID,
          unitId
        ))
    );

    if (this.selectedExercise) {
      this.selectedExercise = null;
    }
  }

  public selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
  }
}
