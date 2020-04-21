import { Component, OnInit } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Unit } from "src/app/model/unit";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-units-bar",
  templateUrl: "./units-bar.component.html",
  styleUrls: ["./units-bar.component.scss"],
})
export class UnitsBarComponent implements OnInit {
  units: Unit[];
  selectedUnit: Unit;

  constructor(
    private unitService: UnitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUnitsFromTrainee();
  }

  public getUnitsFromTrainee() {
    this.unitService
      .getSingle(environment.TRAINEEID)
      .subscribe((units) => {
        this.units = units;
        this.setDefaultRoute(units);
      });
  }

  public selectUnit(unit: Unit) {
    this.selectedUnit = unit;
    if (location.pathname.includes("detail")||location.pathname.includes("add")) {
      this.router
        .navigate(["."])
        .then(() => this.router.navigateByUrl(`units/(exercises:${unit.id})`));
    } else {
      this.router.navigate(["/units", { outlets: { exercises: [unit.id] } }]);
    }
  }

  public setDefaultRoute(units: Unit[]) {
    this.selectUnit(units[0]);
    }

  public addUnit(){
    this.router
    .navigate(["."])
    .then(() =>
    this.router.navigate(["/units", { outlets: { add: ["add"] } }]))
  }

  public editUnit(){
    this.router
    .navigate(["."])
    .then(() =>
    this.router.navigate(["/units", { outlets: { add: ["edit"] } }], { state: this.selectedUnit }))


  }
}
