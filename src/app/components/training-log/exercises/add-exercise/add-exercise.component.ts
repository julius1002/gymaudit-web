import { Component, Inject, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Exercise } from "src/app/model/exercise";
import { take } from "rxjs/operators";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AlertService } from "src/app/services/alert/alert.service";

@Component({
  selector: "app-add-exercise",
  templateUrl: "./add-exercise.component.html",
  styleUrls: ["./add-exercise.component.scss"],
})
export class AddExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { unitid: string },
    public dialogRef: MatDialogRef<AddExerciseComponent>) { }

  ngOnInit(): void {

  }

  postExercise(exercise: Exercise) {
    this.exerciseService.postSingle(this.data.unitid, exercise).pipe(take(1))
      .subscribe((exercise) => {
        console.log(exercise)
        this.dialogRef.close(exercise);
        this.alertService.openSnackBar(
          `${exercise.name} erfolgreich hinzugefügt!`,
          "schließen"
        );
      }, (err) => {
        this.dialogRef.close(undefined);
      });
  }
}
