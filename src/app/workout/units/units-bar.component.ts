import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Observable } from "rxjs";
import { Unit } from "src/app/model/unit";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import { ExerciseListComponent } from "../exercise-list/exercise-list.component";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-units-bar",
  templateUrl: "./units-bar.component.html",
  styleUrls: ["./units-bar.component.scss"],
})
export class UnitsBarComponent implements OnInit {
  units: Unit[];
  selectedUnit: Unit;

  constructor(private unitService: UnitService, private router: Router) {}

  ngOnInit(): void {
    this.getUnitsFromTrainee();
  }

  public getUnitsFromTrainee() {
    this.unitService
      .getUnitsOfTrainee(environment.TRAINEEID)
      .subscribe((units) => {
        this.units = units;
        this.setDefaultRoute(units);
        
      });
  }

  public setDefaultRoute(units: Unit[]) {
    this.router.navigateByUrl(`units/(exercises:${units[0].id})`);
  }
}
