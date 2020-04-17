import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Exercise } from "src/app/model/exercise";
@Component({
  selector: "app-set-list",
  templateUrl: "./set-list.component.html",
  styleUrls: ["./set-list.component.scss"],
})
export class SetListComponent implements OnInit {
  @Input() exercise: Exercise;
  constructor() {}

  ngOnInit(): void {
 
  }
}
