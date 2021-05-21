import { Component, OnInit, Inject } from "@angular/core";
import { SetService } from "src/app/services/set.service";
import { Set } from "src/app/model/set";
import { Exercise } from "src/app/model/exercise";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AlertService } from "src/app/services/alert/alert.service";

@Component({
  selector: "app-add-set",
  templateUrl: "./add-set.component.html",
  styleUrls: ["./add-set.component.scss"],
})
export class AddSetComponent implements OnInit {
  exercise: Exercise;

  constructor(
    private setService: SetService,
    @Inject(MAT_DIALOG_DATA) data,
    private alertService:AlertService,
        public dialogRef: MatDialogRef<AddSetComponent>
  ) {
    this.exercise = data
  }

  ngOnInit(): void { }

  postSet(set: Set) {
    this.setService
      .postSet(this.exercise.id, set)
      .subscribe(set => {
        this.dialogRef.close(set);
        this.alertService.openSnackBar(
          `Satz erfolgreich hinzugefügt!`,
          "schließen");
      });
  }
}
