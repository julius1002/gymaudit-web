import { Component, OnInit } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Unit } from "src/app/model/unit";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { take, share } from "rxjs/operators";
import { UnitListService } from "src/app/services/unit-list.service";

@Component({
  selector: "app-units-bar",
  templateUrl: "./units-bar.component.html",
  styleUrls: ["./units-bar.component.scss"],
})
export class UnitsBarComponent implements OnInit {
  units$: Observable<Unit[]>;
  selectedUnit: Unit;

  constructor(
    private unitService: UnitService,
    private router: Router,
    private unitListService: UnitListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUnitsFromTrainee();

    this.unitListService.unitList.subscribe(unit => {this.updateUnitList(), this.selectedUnit = unit});
    this.unitListService.unitRemoved.subscribe(() => this.removeUnit());

  }

  public updateUnitList() {
    this.units$ = this.unitService.getAll(environment.TRAINEEID);
  }

  public removeUnit(){
    this.units$ = this.unitService.getAll(environment.TRAINEEID).pipe(share());
    this.units$.subscribe(units => this.setDefaultRoute(units));
  }

  public getUnitsFromTrainee() {
    this.units$ = this.unitService.getAll(environment.TRAINEEID).pipe(share());

    this.units$.subscribe((units) => {
      this.setDefaultRoute(units);
    });
  }

  public selectUnit(unit: Unit) {
    this.selectedUnit = unit;
    this.router
      .navigate(["."])
      .then(() => this.router.navigateByUrl(`units/(exercises:${unit.id})`));
  }

  public setDefaultRoute(units: Unit[]) {
    if(units.length){
    this.selectUnit(units[0]);
  }
  }

  public addUnit() {
    this.router
      .navigate(["."])
      .then(() =>
        this.router.navigate(["/units", { outlets: { add: ["add"] } }])
      );
  }

  public editUnit() {
    this.router.navigate(["."]).then(() => {
      this.router.navigate(["/units", { outlets: { add: ["edit",`${this.selectedUnit.id}`] } }], {
        state: this.selectedUnit,
      });
    });
  }

  isSelectedUnit(unit): boolean {
    let unitId;
    if (this.route.firstChild) {
      unitId = this.route.snapshot.firstChild.paramMap.get("unitId");
    }
    return unit.id === unitId;
  }
  
}
