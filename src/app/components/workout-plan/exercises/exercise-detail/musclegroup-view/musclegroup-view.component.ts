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
  //beine
  calves:string = this.wgerBaseUrl + "/static/images/muscles/secondary/muscle-7.svg";
  frontLegs:string = this.wgerBaseUrl + "/static/images/muscles/main/muscle-10.svg";
  booty:string = this.wgerBaseUrl + "/static/images/muscles/secondary/muscle-8.svg";
  //rücken
  lats:string = this.wgerBaseUrl + "/static/images/muscles/main/muscle-12.svg";
  //bauch
  sideAbs:string = this.wgerBaseUrl + "/static/images/muscles/secondary/muscle-3.svg";
  abs:string = this.wgerBaseUrl + "/static/images/muscles/main/muscle-6.svg";
  //brust
  chest:string = this.wgerBaseUrl + "/static/images/muscles/secondary/muscle-4.svg";
  //schulter
  frontDelts:string = this.wgerBaseUrl + "/static/images/muscles/secondary/muscle-2.svg";
  //arme
  biceps:string = this.wgerBaseUrl + "/static/images/muscles/main/muscle-1.svg";
  triceps:string = this.wgerBaseUrl +"/static/images/muscles/secondary/muscle-5.svg";
  anatomyFront:string = this.wgerBaseUrl + "/static/images/muscles/muscular_system_front.svg";
  anatomyBack:string = this.wgerBaseUrl + "/static/images/muscles/muscular_system_back.svg";

  backLegs:string = this.wgerBaseUrl + "/static/images/muscles/main/muscle-11.svg";
  traps:string = this.wgerBaseUrl + "/static/images/muscles/main/muscle-9.svg";
  muscleGroupEnum = MuscleGroup;
  constructor() {}

  ngOnInit(): void {

  }

  isMuscleGroup(muscleGroup:string):boolean{
    return this.exercise.muscleGroups.map(muscleGroup => muscleGroup.toString()).includes(muscleGroup);
  }


  turn():void{
    this.front =!this.front;
  }
}
