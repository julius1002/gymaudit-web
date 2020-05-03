import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap, take, share, tap } from "rxjs/operators";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ExercisesListService } from "src/app/services/exercises-list.service";
import { Page } from "src/app/model/page";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.scss"],
})
export class ExerciseListComponent implements OnInit {
  exercisesPage$: Observable<Page<Exercise>>;
  unitId$: Observable<string>;
  selectedExercise: Exercise;

  index: number = 0;
  pageSize: number = 5;

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

    this.getExercisesPageFromUnit(this.pageSize, 0);

    this.exerciseListService.exerciseList.subscribe((exercise) => {
      this.updateExercises(), (this.selectedExercise = exercise);
    });

    this.exerciseListService.updateExerciseList
      .pipe(switchMap(() => this.exercisesPage$))
      .subscribe((exercises) => {
        this.updateExercisesAfterAdding(exercises.content);
      });
  }

  private updateExercisesAfterAdding(exercises: Exercise[]) {
    this.index = 0;
    this.updateExercises();
    this.selectedExercise = exercises[0];
  }

  private getExercisesPageFromUnit(size: number, page: number): void {
    this.exercisesPage$ = this.unitId$.pipe(
      switchMap((unitId) => this.exerciseService.getByPage(unitId, size, page)),
      take(1),
      share()
    );

    this.exercisesPage$.subscribe((exercisesPage) =>
      this.setDefaultRoute(exercisesPage.content)
    );
  }

  public turn(event:PageEvent) {
    this.getExercisesPageFromUnit(event.pageSize, event.pageIndex);
    this.index = event.pageIndex;
  }

  public updateExercises() {
    this.exercisesPage$ = this.unitId$.pipe(
      switchMap((unitId) =>
        this.exerciseService.getByPage(unitId, this.pageSize, this.index)
      )
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

  public setDefaultRoute(exercises: Exercise[]) {
    if (exercises.length) {
      this.selectExercise(exercises[0]);
    }
  }

  public isSelectedExercise(exercise): boolean {
    let exerciseId;
    if (this.route.snapshot) {
      exerciseId = this.route.snapshot.firstChild.paramMap.get("exerciseId");
    }
    return exercise.id === exerciseId;
  }
}
