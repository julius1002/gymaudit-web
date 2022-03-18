import { Component, HostListener, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Observable } from "rxjs";
import { Page } from "src/app/model/page";
import { Exercise } from "src/app/model/exercise";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, take, map, tap} from "rxjs/operators";
import { ViewChild, ElementRef } from '@angular/core';
import { Unit } from "src/app/model/unit";
import { MatDialog } from "@angular/material/dialog";
import { AddExerciseComponent } from "../add-exercise/add-exercise.component";
import { ExercisesListService } from "src/app/services/exercises-list.service";
import { environment } from "src/environments/environment";
import { EditExerciseComponent } from "../edit-exercise/edit-exercise.component";
import { UnitService } from "src/app/services/unit.service";
import { AlertService } from "src/app/services/alert/alert.service";
@Component({
  selector: "app-log-exercises",
  templateUrl: "./log-exercises.component.html",
  styleUrls: ["./log-exercises.component.scss"],
})
export class LogExercisesComponent implements OnInit {


  selectedUnit: Unit;

  @ViewChild('appLogSets')
  logSetsElement: ElementRef;

  exercisesPage: Page<Exercise>;
  unitId$: Observable<string>;

  index: number = 0;
  pageSize: number = 8;

  apiUrl = environment.api_url;

  editView: boolean = false;

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      var bottomnav = document.getElementById("bottom-nav");
      if (bottomnav) {
        bottomnav.classList.add("show-nav")
      }
    }
  }

  constructor(
    public exerciseService: ExerciseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public exerciseListService: ExercisesListService,
    private alertService: AlertService,
    private router: Router,
    private unitService: UnitService
  ) { }

  public updateResult(result) {
    this.exercisesPage = result;
  }
  
  async ngOnInit() {

    this.selectedUnit = <Unit>history.state.data

    this.route.paramMap.pipe(
      tap(async (paramMap) => {
        if (!this.selectedUnit) {
          this.selectedUnit = await this.unitService.get(paramMap.get("unitId")).toPromise()
        }
      }),
      switchMap((paramMap) =>
        this.exerciseService.getExercises(paramMap.get("unitId"))
      )
    ).subscribe(res => this.exercisesPage = res);

    setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
      , 500)

    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );
  }

  toggleSettingsView() {
    const cards = document.getElementsByClassName("card");
    const backCards = document.getElementsByClassName("exercise-card--back")

    for (let i = 0; i < cards.length; i++) {
      cards.item(i).classList.toggle("exercise-card-flipped")
      backCards.item(i).classList.toggle("to-foreground")
    }
    this.editView = !this.editView
  }

  openDialog(exercise: Exercise = null): void {
    if (exercise) {

      const dialogRef = this.dialog.open(EditExerciseComponent, {
        width: window.innerWidth < 600 ? '95%' : '25%',
        height: window.innerWidth < 600 ? '100%' : '75%',
        data: exercise
      })
      dialogRef.afterClosed().subscribe(result => {

        if (this.editView) {
          this.toggleSettingsView()
        }
        if (result) {
          if (!result.id) {
            this.exercisesPage.content = this.exercisesPage.content.filter(foundExercise => foundExercise !== exercise)
            this.alertService.openSnackBar(
              `${result.name} erfolgreich gelöscht!`,
              "schließen"
            );
          } else {
            this.exercisesPage.content = this.exercisesPage.content.filter(foundExercise => foundExercise !== exercise)
            this.exercisesPage.content.unshift(result)

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
      this.unitId$.subscribe(unitId => {
        const dialogRef = this.dialog.open(AddExerciseComponent, {
          width: window.innerWidth < 600 ? '95%' : '25%',
          height: window.innerWidth < 600 ? '100%' : '75%',
          data: { unitid: unitId }
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.exercisesPage.content.unshift(result)

          }
        });
      })
    }
  };

  selectExercise(exercise: Exercise) {
    if (!this.editView) {
      this.router.navigate(["training-log", "sets", exercise.id], { state: { exercise: exercise } })
    } else {
      this.openDialog(exercise);
    }
  }

  public turn(currentPage: Page<Exercise>, value: number) {
    this.index += value
    this.getExercisesPageFromUnit(currentPage.size, this.index);
  }

  private getExercisesPageFromUnit(size: number, page: number): void {
    this.unitId$.pipe(
      switchMap((unitId) => this.exerciseService.fetchByPage(unitId, size, page)),
      take(1),
      tap((res) => {
        if (res.content.length < 7) {
          setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
            , 500)
        }
      })
    ).subscribe(res => this.exercisesPage = res);
  }
  errorHandler(exercise) {
    exercise.fileId = undefined
  }
}
