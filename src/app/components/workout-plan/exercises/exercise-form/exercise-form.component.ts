import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Exercise, ExerciseType, MuscleGroup } from "src/app/model/exercise";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-exercise-form",
  templateUrl: "./exercise-form.component.html",
  styleUrls: ["./exercise-form.component.scss"],
})
export class ExerciseFormComponent implements OnInit {
  @Input() editing = false;
  @Input() exercise: Exercise;
  unitId$: Observable<string>;
  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;
  @Output() submitBook = new EventEmitter<Exercise>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.unitId$ = this.route.parent.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((exercise) => (this.exercise = exercise));
  }

  removeExercise() {
    if (confirm("Buch wirklich löschen?")) {
      this.unitId$
        .pipe(
          switchMap((unitId) =>
            this.exerciseService.deleteExercise(
              environment.TRAINEEID,
              unitId,
              this.exercise.id
            )
          )
        )
        .subscribe(
          (res) =>
            this.router.navigate(["../"], {
              relativeTo: this.route.parent,
            }) //funktioniert noch nicht!!!
        );
    }
  }
}
