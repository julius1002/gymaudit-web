import { Component, OnInit } from "@angular/core";
import { UnitService } from "src/app/services/unit.service";
import { Unit } from "src/app/model/unit";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Exercise } from "src/app/model/exercise";
import { ExerciseService } from "src/app/services/exercise.service";
import { Page } from "src/app/model/page";

@Component({
  selector: "app-training-log",
  templateUrl: "./training-log.component.html",
  styleUrls: ["./training-log.component.scss"],
})
export class TrainingLogComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit(): void {
  }


}
