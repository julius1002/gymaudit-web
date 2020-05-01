import { Component, OnInit, Input } from "@angular/core";
import { Exercise } from "src/app/model/exercise";

@Component({
  selector: "app-musclegroup-view",
  templateUrl: "./musclegroup-view.component.html",
  styleUrls: ["./musclegroup-view.component.scss"],
})
export class MusclegroupViewComponent implements OnInit {
  @Input() exercise: Exercise;

  constructor() {}

  ngOnInit(): void {
    console.log(this.exercise.muscleGroups)
  }
}
