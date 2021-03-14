import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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
  encapsulation: ViewEncapsulation.None

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

  isSelectedUnit(unit): boolean {
    let unitId;
    if (this.route.firstChild) {
      unitId = this.route.snapshot.firstChild.paramMap.get("unitId");
    }
    return unit.id === unitId;
  }
}
