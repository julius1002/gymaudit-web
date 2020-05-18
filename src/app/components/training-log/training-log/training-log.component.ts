import { Component, OnInit } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Unit } from "src/app/model/unit";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { Page } from "src/app/model/page";

@Component({
  selector: "app-training-log",
  templateUrl: "./training-log.component.html",
  styleUrls: ["./training-log.component.scss"],
})
export class TrainingLogComponent implements OnInit {
  units$: Observable<Unit[]>;
  exercises$: Observable<Page<Exercise>>;
  selectedUnit: Unit;
  selectedExercise: Exercise;
  constructor(
    private unitService: UnitService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.units$ = this.unitService.getAll(environment.TRAINEEID);
  }

  setExercise(unit: Unit) {
    this.selectedUnit = unit;
    this.exercises$ = this.exerciseService.getAll(unit.id);
  }
  selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
  }
}
