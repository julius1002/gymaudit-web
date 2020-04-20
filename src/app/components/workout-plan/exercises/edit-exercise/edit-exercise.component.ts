import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExerciseService } from "src/app/services/exercise.service";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Exercise, ExerciseType, MuscleGroup } from "src/app/model/exercise";

@Component({
  selector: "app-edit-exercise",
  templateUrl: "./edit-exercise.component.html",
  styleUrls: ["./edit-exercise.component.scss"],
})
export class EditExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  putExercise(exercise: Exercise) {
    this.exerciseService.update(exercise).subscribe((exercise) => {
      this.router.navigateByUrl(
        `units/(exercises:${exercise.unitId}/(exercise-detail:detail/${exercise.id}))`
      );
    });
  }
}
