import { Component, Inject, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Exercise } from "src/app/model/exercise";
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { ExercisesListService } from "src/app/services/exercises-list.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-exercise",
  templateUrl: "./add-exercise.component.html",
  styleUrls: ["./add-exercise.component.scss"],
})
export class AddExerciseComponent implements OnInit {
  constructor(
    private exerciseListService: ExercisesListService,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { unitid: string },
    public dialogRef: MatDialogRef<AddExerciseComponent>


  ) { }

  ngOnInit(): void {

  }

  postExercise(exercise: Exercise) {
    this.exerciseService.postSingle(this.data.unitid, exercise).pipe(take(1))
      .subscribe((exercise) => {
        this.dialogRef.close(exercise);
      }, (err) => {
        this.dialogRef.close(undefined);

      });
  }
}
