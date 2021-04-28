import { Component, OnInit, Inject } from "@angular/core";
import { SetService } from "src/app/services/set.service";
import { Set } from "src/app/model/set";
import { Exercise } from "src/app/model/exercise";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    public snackBar: MatSnackBar,
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
        this.snackBar.open(
          `Satz erfolgreich hinzugefügt!`,
          "schließen",
          {
            duration: 2500,
          }
        );
      });
  }
}
