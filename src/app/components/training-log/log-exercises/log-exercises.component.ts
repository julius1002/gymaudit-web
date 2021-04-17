import { Component, HostListener, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Page } from "src/app/model/page";
import { Exercise } from "src/app/model/exercise";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, share, take, map, tap, debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { ViewChild, ElementRef } from '@angular/core';
import { Unit } from "src/app/model/unit";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { MatDialog } from "@angular/material/dialog";
import { AddExerciseComponent } from "../add-exercise/add-exercise.component";
import { ExercisesListService } from "src/app/services/exercises-list.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { EditExerciseComponent } from "../edit-exercise/edit-exercise.component";
@Component({
  selector: "app-log-exercises",
  templateUrl: "./log-exercises.component.html",
  styleUrls: ["./log-exercises.component.scss"],
})
export class LogExercisesComponent implements OnInit {


  selectedUnit;

  @ViewChild('appLogSets')
  logSetsElement: ElementRef;

  exercisesPage: Page<Exercise>;
  unitId$: Observable<string>;

  keyUp$ = new Subject<string>();

  index: number = 0;
  pageSize: number = 8;

  apiUrl = environment.BACKEND_URL;
  editView: boolean = false;

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      var bottomnav = document.getElementById("bottom-nav");
      if (bottomnav) {
        bottomnav.classList.add("show-nav")
      }
    }
  }
  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public exerciseListService: ExercisesListService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.keyUp$.pipe(
      filter(filter => filter.length >= 3 || filter.length == 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(filter => {
        return this.unitId$.pipe(
          switchMap((unitId) => this.exerciseService.getByPage(unitId, this.pageSize, 0, filter)),
          take(1),
          tap((res) => {
            if (res.content.length < 7) {
              var bottomNav = document.getElementById("bottom-nav");
              setTimeout(() => bottomNav.classList.add("show-nav")
                , 500)
            }
          })
        );
      }),
    ).subscribe(res => this.exercisesPage = res)


    this.selectedUnit = <Unit>history.state.data

    this.route.paramMap.pipe(
      switchMap((paramMap) =>
        this.exerciseService.getByPage(paramMap.get("unitId")
          , this.pageSize, this.index)
      ),
      share(),
      tap((res) => {
        if (res.content.length < 7) {
          setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
            , 500)
        }
      })
    ).subscribe(res => this.exercisesPage = res);

    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );


  }

  toggleSettingsView() {
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      cards.item(i).classList.toggle("exercise-card-flipped")
    }
    this.editView = !this.editView

  }
  openDialog(exercise: Exercise = null): void {
    if (exercise) {

      const dialogRef = this.dialog.open(EditExerciseComponent, {
        width: '75%',
        height: '85%',
        data: exercise
      })
      dialogRef.afterClosed().subscribe(result => {

        if (this.editView) {
          this.toggleSettingsView()
        }
        if (result) {
          if (!result.id) {
            this.exercisesPage.content = this.exercisesPage.content.filter(foundExercise => foundExercise !== exercise)
            this.snackBar.open(
              `${result.name} erfolgreich gelöscht!`,
              "schließen",
              {
                duration: 2500,
              }
            );
          } else {
            this.exercisesPage.content = this.exercisesPage.content.filter(foundExercise => foundExercise !== exercise)
            this.exercisesPage.content.unshift(result)

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
      this.unitId$.subscribe(unitId => {
        const dialogRef = this.dialog.open(AddExerciseComponent, {
          width: '75%',
          height: '85%',
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
      this.router.navigate(["training-log", "sets", exercise.id], { state: exercise })
    } else {
      this.openDialog(exercise);
    }


  }


  toggleSearchBar() {
    var searchButton = document.getElementsByClassName("search-button").item(0);
    var closeButton = document.getElementsByClassName("close-button").item(0);
    var searchBar = <HTMLInputElement>document.getElementById("search-bar");
    var unitTitle = document.getElementById("unit-title");

    if (!searchButton.classList.contains("invisible")) {
      searchBar.focus();
    } else {
      searchBar.value = ""
      this.keyUp$.next("")
    }
    searchBar.classList.toggle("invisible")
    unitTitle.classList.toggle("invisible")
    searchButton.classList.toggle("invisible")
    closeButton.classList.toggle("visible")

  }


  public turn(currentPage: Page<Exercise>, value: number) {
    this.index += value
    this.getExercisesPageFromUnit(currentPage.size, this.index);
  }

  private getExercisesPageFromUnit(size: number, page: number): void {
    this.unitId$.pipe(
      switchMap((unitId) => this.exerciseService.getByPage(unitId, size, page)),
      take(1),
      tap((res) => {
        if (res.content.length < 7) {
          setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
            , 500)
        }
      })
    ).subscribe(res => this.exercisesPage = res);
  }
}
