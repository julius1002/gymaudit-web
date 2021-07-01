import { Component, HostListener, OnInit } from '@angular/core';
import { Unit } from 'src/app/model/unit';
import { Page } from 'src/app/model/page';
import { Exercise } from 'src/app/model/exercise';
import { UnitService } from 'src/app/services/unit.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AddUnitDialogComponent } from '../add-unit-dialog/add-unit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditUnitComponent } from '../edit-unit/edit-unit.component';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-log-unit-list',
  templateUrl: './log-unit-list.component.html',
  styleUrls: ['./log-unit-list.component.scss']
})
export class LogUnitListComponent implements OnInit {
  unitsPage: Page<Unit>;
  selectedUnit: Unit;
  selectedExercise: Exercise;
  index: number = 0;
  pageSize: number = 5;

  environment = environment;

  editView: boolean = false;

  isLoading: boolean = false;

  constructor(
    private unitService: UnitService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private alertService: AlertService
  ) { }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!this.unitsPage?.last) {
        this.isLoading = true
        this.unitService.fetchByPage(this.pageSize, this.index += 1, "").pipe(take(1)).subscribe((res: Page<Unit>) => {
          this.unitsPage.content = this.unitsPage.content.concat(res.content)
          this.unitsPage.last = res.last
          this.isLoading = false
        })
        setTimeout(() => {
          if (this.editView) {
            const cards = document.getElementsByClassName("card");
            for (let i = 0; i < cards.length; i++) {
              if (!cards.item(i).classList.contains("unit-card-flipped")) {
                cards.item(i).classList.toggle("unit-card-flipped")
              }
            }
          }
        }, 100)

      }
    }
  }
  ngOnInit(): void {
    this.unitService.getUnits().subscribe(units => this.unitsPage = units)
    setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
      , 500)
  }

  errorHandler(unit) {
    unit.fileId = undefined
  }

  toggleSettingsView() {
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      cards.item(i).classList.toggle("unit-card-flipped")
    }
    this.editView = !this.editView

  }

  public turn(currentPage: Page<Unit>, value: number) {
    this.index += value
    this.getUnitsPage(currentPage.size, this.index)
  }

  private getUnitsPage(size: number, page: number): void {
    this.unitService.fetchByPage(size, page, "").pipe(
      take(1))
      .subscribe(res => {
        this.unitsPage = res;
      });
  }

  openDialog(unit: Unit = undefined): void {
    var dialogRef
    if (unit) {
      dialogRef = this.dialog.open(EditUnitComponent, {
        width: window.innerWidth < 600 ? '95%' : '25%',
        height: window.innerWidth < 600 ? '100%' : '75%',
        data: unit
      })

      dialogRef.afterClosed().subscribe(result => {
        if (this.editView) {
          this.toggleSettingsView()
        }
        if (result) {
          if (!result.id) {
            this.unitsPage.content = this.unitsPage.content.filter(foundUnit => foundUnit !== unit)
            this.alertService.openSnackBar(
              `${result.name} erfolgreich gelöscht!`,
              "schließen"
            );
          } else {
            this.unitsPage.content = this.unitsPage.content.filter(foundUnit => foundUnit !== unit)
            this.unitsPage.content.unshift(result)
            this.alertService.openSnackBar(
              `${result.name} erfolgreich geändert!`,
              "schließen"
            );
          }
        }
      });
    } else {
      if (this.editView) {
        this.toggleSettingsView()
      }
      dialogRef = this.dialog.open(AddUnitDialogComponent, {
        width: window.innerWidth < 600 ? '95%' : '25%',
        height: window.innerWidth < 600 ? '100%' : '75%',
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.unitsPage.content.unshift(result)
          this.alertService.openSnackBar(
            `${result.name} erfolgreich hinzugefügt!`,
            "schließen"
          );

        }
      });
    }

  };

  routeToExercise($event, unit: Unit) {
    if (!this.editView) {
      this.router.navigate([unit.id], { relativeTo: this.route, state: { data: unit } })
    } else {
      this.openDialog(unit);
    }

  }

}
