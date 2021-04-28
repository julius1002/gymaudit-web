import { Component, OnInit, Input, LOCALE_ID, Inject } from "@angular/core";
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

@Component({
  selector: "app-log-sets",
  templateUrl: "./log-sets.component.html",
  styleUrls: ["./log-sets.component.scss"],
})
export class LogSetsComponent implements OnInit {

  sets: Set[];

  exercise: Exercise;

  exerciseId: string;

  constructor(private router: Router, private route: ActivatedRoute, private setService: SetService, private exerciseService: ExerciseService, @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog,
  ) { }

  title: string = "Heutige Sätze"

  async ngOnInit() {
    this.exercise = window.history.state

    this.exerciseId = this.route.snapshot.paramMap.get("exerciseId") || window.history.state?.id

    this.setService.getSets(this.exerciseId)
      .subscribe(sets => this.sets = sets)

    var bottomNav = document.getElementById("set-nav");
    setTimeout(() => bottomNav.classList.add("show-nav")
      , 500)
  }

  async navigateBack() {
    if (!window.history.state.date) {
      this.exercise = await this.exerciseService.getSingle(this.exerciseId).toPromise()
    }

    this.router.navigate(["training-log", "units", this.exercise.unitId])
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

    $event.value.toString()

    this.sets = await this.setService.getSets(this.exerciseId, $event.value.toISOString()).toPromise()
  }

  async openDialog(set: Set = undefined) {

    if (set) {
      const dialogRef = this.dialog.open(EditSetComponent, {
        width: '75%',
        height: '85%',
        data: set
      })

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sets = this.sets.filter(set => set.id != result.id)
          this.sets.unshift(result)
        }
      })
    } else {

      if (!window.history.state.date) {
        this.exercise = await this.exerciseService.getSingle(this.exerciseId).toPromise()
      }

      const dialogRef = this.dialog.open(AddSetComponent, {
        width: '75%',
        height: '85%',
        data: this.exercise
      })

      dialogRef.afterClosed().subscribe(result => {
        this.sets.unshift(result)
      })
    }
  }

  async delete(set: Set) {
    if (confirm("Soll der Satz gelöscht werden?")) {
      try {
        var setResponse = await this.setService.delete(set.exerciseId, set.id).toPromise()
        this.sets = this.sets.filter(set => set.id != setResponse.id)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
