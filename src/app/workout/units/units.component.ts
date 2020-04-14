import { Component, OnInit } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Observable } from "rxjs";
import { Unit } from "src/app/model/unit";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-units",
  templateUrl: "./units.component.html",
  styleUrls: ["./units.component.scss"],
})
export class UnitsComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  units$: Observable<Unit[]>;
  
  selectedUnit: Unit;
  selectedExercise: Exercise;

  constructor(
    private unitService: UnitService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.getUnitsFromTrainee();
  }

  public getExercisesFromUnit(unit: Unit): void {
    this.selectedUnit = unit;
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
  public getUnitsFromTrainee() {
    this.units$ = this.unitService.getUnitsOfTrainee(environment.TRAINEEID);
  }
}
