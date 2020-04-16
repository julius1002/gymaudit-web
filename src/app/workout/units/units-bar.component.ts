import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Observable } from "rxjs";
import { Unit } from "src/app/model/unit";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';

@Component({
  selector: "app-units-bar",
  templateUrl: "./units-bar.component.html",
  styleUrls: ["./units-bar.component.scss"],
})
export class UnitsBarComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  units$: Observable<Unit[]>;
  selectedUnit: Unit;
  
  constructor(
    private unitService: UnitService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.getUnitsFromTrainee();
  }

  public getUnitsFromTrainee() {
    this.units$ = this.unitService.getUnitsOfTrainee(environment.TRAINEEID);
  }

  public selectUnit(unit:Unit){
    this.selectedUnit = unit;
  }
}
