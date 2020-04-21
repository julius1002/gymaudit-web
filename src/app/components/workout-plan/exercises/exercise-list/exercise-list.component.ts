import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.scss"],
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[];
  unitId$: Observable<string>;
  selectedExercise: Exercise;

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
      .pipe(switchMap((unitId) => this.exerciseService.getAll(unitId)))
      .subscribe((exercises) => {
        (this.exercises = exercises), this.setDefaultRoute(exercises);
      }); 
  }

  public selectExercise(exercise: Exercise) {
    
    this.unitId$.pipe(take(1)).subscribe(
      (unitId) => {
        this.navigateToExercise(exercise, unitId);
      } //this.ifExerciseExistingShow(exercise, unitId)
    );
  }

  public navigateToExercise(exercise, unitId: string) {
    this.selectedExercise = exercise;
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
}
