import { Component, OnInit, Inject } from "@angular/core";
import { Set } from "src/app/model/set";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SetService } from "src/app/services/set.service";
@Component({
  selector: "app-edit-set",
  templateUrl: "./edit-set.component.html",
  styleUrls: ["./edit-set.component.css"],
})
export class EditSetComponent implements OnInit {
  set: Set;
  constructor(public dialogRef: MatDialogRef<EditSetComponent>, @Inject(MAT_DIALOG_DATA) public data, private setService: SetService) {
    this.set = data;
  }

  ngOnInit() {
  }

  putSet(set: Set) {
    this.setService
      .put(set.exerciseId, set.id, set)
      .subscribe((setResponse) => {
        this.dialogRef.close(setResponse)
      });
  }
}
