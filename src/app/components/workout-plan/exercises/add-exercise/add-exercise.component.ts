import { Component, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Exercise } from "src/app/model/exercise";
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-exercise",
  templateUrl: "./add-exercise.component.html",
  styleUrls: ["./add-exercise.component.scss"],
})
export class AddExerciseComponent implements OnInit {
  unitId$: Observable<string>;
  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitId$ = this.route.parent.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );
  }

  postExercise(exercise: Exercise) {
    this.unitId$
      .pipe(
        take(1),
        switchMap((unitId) => this.exerciseService.postSingle(unitId, exercise))
      )
      .subscribe((exercise) => {this.router.navigateByUrl(`units/(exercises:${exercise.unitId}/(exercise-detail:detail/${exercise.id}))`)});
  }
}
