import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.scss"],
})
export class ExerciseListComponent implements OnInit {
  selectedExercise: Exercise;
  exercises: Exercise[];
  unitId$: Observable<string>;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );

    this.getExercisesFromUnit();
  }

  public getExercisesFromUnit(): void {
    this.unitId$
      .pipe(
        switchMap((unitId) =>
          this.exerciseService.getExercisesOfUnitOfTrainee(
            environment.TRAINEEID,
            unitId
          )
        )
      )
      .subscribe((exercises) =>
        this.setExercisesAndSelectFirstAsDefault(exercises)
      );

    if (this.selectedExercise) {
      this.selectedExercise = null;
    }
  }

  public selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;

    this.unitId$.subscribe((unitId) =>
      this.ifExerciseExistingShowFirst(exercise, unitId)
    );
  }

  public ifExerciseExistingShowFirst(exercise, unitId: string) {
    if (exercise) {
      console.log(exercise)
      this.router.navigateByUrl(
        `units/(exercises:${unitId}/(exercise-detail:detail/${exercise.id}))`,
        { state: exercise }
      );
    } else {
      this.router.navigateByUrl(`(exercises:${unitId})`, { state: null });
    }
  }

  public setExercisesAndSelectFirstAsDefault(exercises: Exercise[]) {
    this.exercises = exercises;
    if (exercises) {
      this.selectExercise(exercises[0]); //setzt erste ausgewählte übung (exercises:5e99748ee86df03c29bdeba0/(exercises-detail:detail))
    }
  }
}
