import { Component, OnInit } from "@angular/core";
import { ExerciseType, MuscleGroup, Exercise } from "src/app/model/exercise";
import { map } from "rxjs/operators";
import { Observable, zip, combineLatest } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-exercise-detail",
  templateUrl: "./exercise-detail.component.html",
  styleUrls: ["./exercise-detail.component.scss"],
})
export class ExerciseDetailComponent implements OnInit {
  exercise$: Observable<Exercise>;

  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;

  unitId$: Observable<string>;
  exerciseId$: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.unitId$ = this.route.parent.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );
    this.exerciseId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("exerciseId"))
    );
    combineLatest(this.exerciseId$, this.unitId$).subscribe(
      ([exerciseId, unitId]) =>
        (this.exercise$ = this.exerciseService.getSingle(
          unitId,
          exerciseId
        ))
    );
  }

  navigateToEdit() {
    zip(this.exercise$, this.unitId$).subscribe(([exercise, unitId]) => {
      this.router.navigateByUrl(
        `units/(exercises:${unitId}/(exercise-detail:edit/${exercise.id}))`,
        { state: exercise }
      );
    });
  }
}
