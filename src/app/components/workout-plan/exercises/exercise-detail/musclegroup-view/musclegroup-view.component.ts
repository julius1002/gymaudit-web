import { Component, OnInit, Input } from "@angular/core";
import { Exercise, MuscleGroup } from "src/app/model/exercise";

@Component({
  selector: "app-musclegroup-view",
  templateUrl: "./musclegroup-view.component.html",
  styleUrls: ["./musclegroup-view.component.scss"],
})
export class MusclegroupViewComponent implements OnInit {
  @Input() exercise: Exercise;

  anatomyPath:string = "https://wger.de/static/images/muscles/muscular_system_front.svg";
  muscleGroupEnum = MuscleGroup;
  constructor() {}

  ngOnInit(): void {
    console.log(this.exercise.muscleGroups)
  }
}
