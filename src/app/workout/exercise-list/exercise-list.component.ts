import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Unit } from "src/app/model/unit";
import { Observable } from "rxjs";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import { faPlus  } from  '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styleUrls: ["./exercise-list.component.scss"],
})
export class ExerciseListComponent implements OnInit {
  selectedExercise: Exercise;
  @Input() unit: Unit;
  exercises$: Observable<Exercise[]>;
  faPlus = faPlus;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getExercisesFromUnit(this.unit);
  }

  public getExercisesFromUnit(unit: Unit): void {
    this.unit = unit;
    this.exercises$ = this.exerciseService.getExercisesOfUnitOfTrainee(
      environment.TRAINEEID,
      unit.id
    );

    if (this.selectedExercise) {
      this.selectedExercise = null;
    }
  }

  public selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
  }
}
