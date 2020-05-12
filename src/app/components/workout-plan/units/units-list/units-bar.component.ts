import { Component, OnInit } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Unit } from "src/app/model/unit";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { UnitListService } from "src/app/services/unit-list.service";
import { AddUnitDialogComponent } from "../add-unit-dialog/add-unit-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { EditUnitDialogComponent } from "../edit-unit-dialog/edit-unit-dialog.component";

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
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUnitsFromTrainee();
    this.unitListService.unitList.subscribe((unit) => {
      this.updateUnitList();
      this.selectUnit(unit)
    });
    this.unitListService.unitRemoved.subscribe(() => this.removeUnit());
  }

  public updateUnitList() {
    this.units$ = this.unitService.getAll(environment.TRAINEEID);
  }

  public removeUnit() {
    this.units$ = this.unitService.getAll(environment.TRAINEEID).pipe(share());
    this.units$.subscribe((units) => this.setDefaultRoute(units));
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
      .navigate(["../"])
      .then(() => this.router.navigateByUrl(`units/(exercises:${unit.id})`));
  }

  public setDefaultRoute(units: Unit[]) {
    if (units.length) {
      this.selectUnit(units[0]);
    }
  }

  public addUnit() {
    const dialogRef = this.dialog.open(AddUnitDialogComponent, {
      width: '400px', height: '400px'
    });
  }

  public editUnit() {
    const dialogRef = this.dialog.open(EditUnitDialogComponent, {
      width: '400px', height: '400px',
      data: { unit: this.selectedUnit },
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
