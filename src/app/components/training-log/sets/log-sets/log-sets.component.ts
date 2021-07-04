import { Component, OnInit, Input, LOCALE_ID, Inject, QueryList, ElementRef, ViewChildren, Renderer2 } from "@angular/core";
import { Exercise } from "src/app/model/exercise";
import { MeasureUnit, Set } from "src/app/model/set";
import { ActivatedRoute, Router } from "@angular/router";
import { SetService } from "src/app/services/set.service";
import { ExerciseService } from "src/app/services/exercise.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DatePipe } from "@angular/common";
import { AddSetComponent } from "../add-set/add-set.component";
import { MatDialog } from "@angular/material/dialog";
import { EditSetComponent } from "../edit-set/edit-set.component";
import { delay, take, tap } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "app-log-sets",
  templateUrl: "./log-sets.component.html",
  styleUrls: ["./log-sets.component.scss"],
})
export class LogSetsComponent implements OnInit {

  sets: Set[];

  selectedExercise: Exercise;

  exerciseId: string;

  date = Date.now()

  title: string = "Heutige Sätze"

  measureUnit = MeasureUnit

  showMuscleGroups: boolean = false;

  @ViewChildren("setElements") setElements;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private setService: SetService,
    private exerciseService: ExerciseService,
    @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {

    this.selectedExercise = <Exercise>history.state.exercise

    this.exerciseId = this.route.snapshot.paramMap.get("exerciseId")

    if (!this.selectedExercise) {
      this.selectedExercise = await this.exerciseService.get(this.exerciseId).toPromise()
    }

    this.setService.getSets(this.exerciseId)
      .subscribe(sets => {
        this.sets = sets;
      })
    var bottomNav = document.getElementById("set-nav");
    setTimeout(() => bottomNav.classList.add("show-nav")
      , 500)
  }

  async navigateBack() {
    this.router.navigate(["training-log", "units", this.selectedExercise.unitId])
  }

  toggleSearchBar() {
    var searchButton = document.getElementsByClassName("search-button").item(0);
    var closeButton = document.getElementsByClassName("close-button").item(0);
    var searchBar = <HTMLInputElement>document.getElementById("search-bar");
    var setTitle = document.getElementById("set-title");

    if (!searchButton.classList.contains("invisible")) {
      searchBar.focus();
    } else {
      searchBar.value = ""
    }
    searchBar.classList.toggle("invisible")
    setTitle.classList.toggle("invisible")
    searchButton.classList.toggle("invisible")
    closeButton.classList.toggle("visible")
  }

  async dateChange($event: MatDatepickerInputEvent<Date>) {

    this.title = new DatePipe(this.locale).transform($event.value, 'dd-MM-yyyy');

    this.sets = await this.setService.getSets(this.exerciseId, $event.value.toISOString()).toPromise()

    var bottomNav = document.getElementById("set-nav");

    var isToday = moment($event.value).isSame(new Date(), "day");

    if (isToday) {
      bottomNav.classList.add("show-nav")
    } else {
      bottomNav.classList.remove("show-nav")
    }

  }

  async openDialog(set: Set = undefined) {

    if (set) {
      const dialogRef = this.dialog.open(EditSetComponent, {
        width: window.innerWidth < 600 ? '95%' : '25%',
        height: window.innerWidth < 600 ? '100%' : '75%',
        data: set
      })


      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sets = this.sets.filter(set => set.id != result.id)
          this.sets.unshift(result)
        }
      })
    } else {

      const dialogRef = this.dialog.open(AddSetComponent, {
        width: window.innerWidth < 600 ? '95%' : '25%',
        height: window.innerWidth < 600 ? '100%' : '75%',
        data: this.selectedExercise
      })

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sets.unshift(result)
          this.setElements.changes.pipe(
            take(1),
            tap(res => document.getElementById(result.id).classList.add("new-mat-expansion-panel")),
            delay(600)
          ).subscribe(res => {
            document.getElementById(result.id).classList.remove("new-mat-expansion-panel")
          })
        }

      })
    }
  }

  delete(set: Set) {
    if (confirm("Soll der Satz gelöscht werden?")) {
      try {
        this.setService.delete(set.exerciseId, set.id).pipe(tap((res) => {
          document.getElementById(res.id).classList.add("delete-mat-expansion-panel")
        }), delay(500))
          .subscribe(
            res => {
              this.sets = this.sets.filter(set => set.id != res.id)

            }
          )
      } catch (err) {
        console.log(err)
      }
    }
  }

  errorHandler(exercise) {
    exercise.fileId = undefined
  }

}
