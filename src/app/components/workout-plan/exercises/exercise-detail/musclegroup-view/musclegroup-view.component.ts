import { Component, OnInit, Input } from "@angular/core";
import { Exercise, MuscleGroup } from "src/app/model/exercise";

@Component({
  selector: "app-musclegroup-view",
  templateUrl: "./musclegroup-view.component.html",
  styleUrls: ["./musclegroup-view.component.scss"],
})
export class MusclegroupViewComponent implements OnInit {
  @Input() exercise: Exercise;
  front:boolean = true;

  wgerBaseUrl:string = "https://wger.de";
  
  biceps:string = this.wgerBaseUrl + "/static/images/muscles/main/muscle-1.svg";
  anatomyFront:string = this.wgerBaseUrl + "/static/images/muscles/muscular_system_front.svg";
  anatomyBack:string = this.wgerBaseUrl + "/static/images/muscles/muscular_system_back.svg";
  
  muscleGroupEnum = MuscleGroup;
  constructor() {}

  ngOnInit(): void {
    console.log(this.exercise.muscleGroups)
  }

  turn():void{
    this.front =!this.front;
  }
}
