import { Component, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Exercise } from "src/app/model/exercise";
import { MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "src/app/services/alert/alert.service";

@Component({
  selector: "app-edit-exercise",
  templateUrl: "./edit-exercise.component.html",
  styleUrls: ["./edit-exercise.component.scss"],
})
export class EditExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    public dialogRef: MatDialogRef<EditExerciseComponent>,
    private alertService: AlertService
  ) { }

  ngOnInit(): void { }

  putExercise(exercise: Exercise) {
    this.exerciseService.update(exercise).subscribe((putExercise) => {
      this.dialogRef.close(putExercise);
      this.alertService.openSnackBar(`${exercise.name} erfolgreich geändert!`,
        "schließen");
    }, (err) => {
      this.dialogRef.close(undefined);

    })
  };


  deleteExercise(exercise: Exercise) {
    if (confirm(`Übung ${exercise.name} wirklich löschen?`)) {
      this.exerciseService.delete(exercise.unitId, exercise.id)
        .subscribe((deleteExercise) => {
          deleteExercise.id = undefined
          this.dialogRef.close(deleteExercise);
        }, (err) => {
          this.dialogRef.close(undefined);

        });
    }

  }
}
