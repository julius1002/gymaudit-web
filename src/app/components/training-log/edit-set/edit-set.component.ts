import { Component, OnInit, Inject } from "@angular/core";
import { Set } from "src/app/model/set";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SetService } from "src/app/services/set.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Exercise } from "src/app/model/exercise";
@Component({
  selector: "app-edit-set",
  templateUrl: "./edit-set.component.html",
  styleUrls: ["./edit-set.component.css"],
})
export class EditSetComponent implements OnInit {
  set: Set;
  exercise: Exercise;
  constructor(
    public dialogRef: MatDialogRef<EditSetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private setService: SetService,
    private activatedRoute: ActivatedRoute
  ) {
    this.exercise = data.exercise;
    this.set = data.set;
  }

  ngOnInit() {
  }

  putSet(set: Set) {
    //TODO Fehlermeldung aus Backend ausgeben/ error catchen
    this.setService
      .putSet(this.exercise.unitId, this.exercise.id, set)
      .subscribe((x) => console.log(x));
  }
}
