import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/model/unit';
import { Page } from 'src/app/model/page';
import { Exercise } from 'src/app/model/exercise';
import { UnitService } from 'src/app/services/unit.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { AddUnitDialogComponent } from '../add-unit-dialog/add-unit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUnitComponent } from '../edit-unit/edit-unit.component';

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

  apiUrl = environment.api_url;

  editView: boolean = false;

  isLoading: boolean = false;

  constructor(
    private unitService: UnitService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar

  ) { }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!this.unitsPage?.last) {
        this.isLoading = true
        this.unitService.getByPage(this.pageSize, this.index += 1, "").pipe(take(1)).subscribe((res: Page<Unit>) => {
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
    this.getUnitsPage(this.pageSize, this.index)

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
    this.unitService.getByPage(size, page, "").pipe(
      take(1))
      .subscribe(res => {
        this.unitsPage = res;
        if (res.content.length < 7) {
          setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
            , 500)
        }
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
            this.snackBar.open(
              `${result.name} erfolgreich gelöscht!`,
              "schließen",
              {
                duration: 2500,
              }
            );
          } else {
            this.unitsPage.content = this.unitsPage.content.filter(foundUnit => foundUnit !== unit)
            this.unitsPage.content.unshift(result)
            this.snackBar.open(
              `${result.name} erfolgreich geändert!`,
              "schließen",
              {
                duration: 2500,
              }
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
          this.snackBar.open(
            `${result.name} erfolgreich hinzugefügt!`,
            "schließen",
            {
              duration: 2500,
            }
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
