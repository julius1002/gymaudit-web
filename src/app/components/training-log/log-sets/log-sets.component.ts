import { Component, OnInit, Input } from "@angular/core";
import { Exercise } from "src/app/model/exercise";
import { Set, MeasureUnit } from "src/app/model/set";
import { switchMap, tap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { SetService } from "src/app/services/set.service";
import { ExerciseService } from "src/app/services/exercise.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-log-sets",
  templateUrl: "./log-sets.component.html",
  styleUrls: ["./log-sets.component.scss"],
})
export class LogSetsComponent implements OnInit {

  sets: Set[];

  exercise: Exercise;

  constructor(private router: Router, private route: ActivatedRoute, private setService: SetService, private exerciseService: ExerciseService) { }

  title: string = "Heutige Sätze"

  ngOnInit(): void {
    this.exercise = window.history.state

    var exerciseId = this.route.snapshot.paramMap.get("exerciseId") || window.history.state?.id

    this.setService.getSets(exerciseId)
      .subscribe(sets => this.sets = sets)

    var bottomNav = document.getElementById("set-nav");
    setTimeout(() => bottomNav.classList.add("show-nav")
      , 500)
  }

  navigateBack() {
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

  dateChange($event: MatDatepickerInputEvent<Date>) {
    console.log($event.value.valueOf())
    this.setService.getSets(this.route.snapshot.paramMap.get("exerciseId"), $event.value.valueOf())
    .subscribe(res => this.sets = res)
  }
}
