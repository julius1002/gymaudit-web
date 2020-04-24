import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap, take, share } from "rxjs/operators";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ExercisesListService } from "src/app/services/exercises-list.service";

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.scss"],
})
export class ExerciseListComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  unitId$: Observable<string>;
  selectedExercise: Exercise;

  constructor(
    private exerciseService: ExerciseService,
    private exerciseListService: ExercisesListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );

    this.getExercisesFromUnit();
    this.exerciseListService.exerciseList.subscribe((exercise) => {
      this.updateExercises(), (this.selectedExercise = exercise),
      console.log(exercise)
    });
  }

  public getExercisesFromUnit(): void {
    this.exercises$ = this.unitId$.pipe(
      switchMap((unitId) => this.exerciseService.getAll(unitId)),
      take(1),
      share()
    );

    this.exercises$.subscribe((exercises) => this.setDefaultRoute(exercises));
  }

  public updateExercises() {
    this.exercises$ = this.unitId$.pipe(
      switchMap((unitId) => this.exerciseService.getAll(unitId))
    );
  }

  public selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.unitId$.pipe(take(1)).subscribe((unitId) => {
      this.navigateToExercise(exercise, unitId);
    });
  }

  public navigateToExercise(exercise, unitId: string) {
    this.router.navigateByUrl(
      `units/(exercises:${unitId}/(exercise-detail:detail/${exercise.id}))`
    );
  }

  public navigateToAddExercise() {
    this.unitId$
      .pipe(take(1))
      .subscribe((unitId) =>
        this.router.navigateByUrl(
          `units/(exercises:${unitId}/(exercise-detail:add))`
        )
      );
  }

  navigateToEdit() {
    this.unitId$.subscribe(unitId =>
    this.router.navigateByUrl(
      `units/(exercises:${unitId}/(exercise-detail:edit/${this.selectedExercise.id}))`,
      { state: this.selectedExercise }
    ));
  }

  public setDefaultRoute(exercises: Exercise[]) {
    if (exercises.length) {
      this.selectExercise(exercises[0]);
    }
  }

  isSelectedExercise(exercise): boolean {
    let exerciseId;
    if (this.route.snapshot) {
      exerciseId = this.route.snapshot.firstChild.paramMap.get("exerciseId");
    }
    return exercise.id === exerciseId;
  }
}
