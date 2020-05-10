import { Component, OnInit } from "@angular/core";
import { ExerciseType, MuscleGroup, Exercise } from "src/app/model/exercise";
import { map, withLatestFrom, share, take, shareReplay } from "rxjs/operators";
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

    this.exerciseId$
      .pipe(withLatestFrom(this.unitId$))
      .subscribe(
        ([exerciseId, unitId]) =>
          (this.exercise$ = this.exerciseService
            .getSingle(unitId, exerciseId)
            .pipe(shareReplay(), take(1)))
      );
  }

  public navigateToEdit() {
    this.exercise$.subscribe((exercise) =>
      this.router.navigateByUrl(
        `units/(exercises:${exercise.unitId}/(exercise-detail:edit/${exercise.id}))`,
        { state: exercise }
      )
    );
  }
 
}
