import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExerciseService } from "src/app/services/exercise.service";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Exercise, ExerciseType, MuscleGroup } from "src/app/model/exercise";

@Component({
  selector: "app-edit-exercise",
  templateUrl: "./edit-exercise.component.html",
  styleUrls: ["./edit-exercise.component.scss"],
})
export class EditExerciseComponent implements OnInit {
  unitId$: Observable<string>;
  exercise: Exercise;
  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitId$ = this.route.parent.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((exercise) => (this.exercise = exercise));
  }
}
