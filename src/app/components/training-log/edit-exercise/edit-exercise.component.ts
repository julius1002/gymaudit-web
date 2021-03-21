import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExerciseService } from "src/app/services/exercise.service";
import { Exercise } from "src/app/model/exercise";
import { ExercisesListService } from 'src/app/services/exercises-list.service';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-exercise",
  templateUrl: "./edit-exercise.component.html",
  styleUrls: ["./edit-exercise.component.scss"],
})
export class EditExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    public dialogRef: MatDialogRef<EditExerciseComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  putExercise(exercise: Exercise) {
    this.exerciseService.update(exercise).subscribe((exercise) => {
      if (exercise.fileId) {
        exercise.fileId += "?jwt=" + localStorage.getItem("jwt")
      }
      this.dialogRef.close(exercise);

      this.snackBar.open(
        `${exercise.name} erfolgreich geändert!`,
        "schließen",
        {
          duration: 2500,
        }
      );
    }, (err) => {
      this.dialogRef.close(undefined);

  })};
}
