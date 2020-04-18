import { Component, OnInit, Input } from "@angular/core";
import { ExerciseType, MuscleGroup, Exercise } from "src/app/model/exercise";
import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-exercise-detail",
  templateUrl: "./exercise-detail.component.html",
  styleUrls: ["./exercise-detail.component.scss"],
})
export class ExerciseDetailComponent implements OnInit {
  exercise: Exercise;

  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;

  unitId$: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((exercise) => (this.exercise = exercise));

    this.unitId$ = this.route.parent.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );
  }

  navigateToEdit() {

    this.unitId$.subscribe(unitId => this.router.navigateByUrl(
      
        `units/(exercises:${unitId}/(exercise-detail:edit/${this.exercise.id}))`,
      
      { state: this.exercise }
    ));

    this.unitId$.pipe(
      switchMap((unitId) =>
        this.router.navigate(
          [
            "../"
          ],
          { state: this.exercise }
        )
      )
      //`units/(exercises:${unitId}/(exercise-detail:${this.exercise.id}))`,
    );
  }

  
}
