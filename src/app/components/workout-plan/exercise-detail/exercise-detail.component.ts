import { Component, OnInit, Input } from "@angular/core";
import { Exercise, ExerciseType, MuscleGroup } from "src/app/model/exercise";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Location } from "@angular/common";
import { map, switchMap } from "rxjs/operators";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-exercise-detail",
  templateUrl: "./exercise-detail.component.html",
  styleUrls: ["./exercise-detail.component.scss"],
})
export class ExerciseDetailComponent implements OnInit {
  exercise$: Observable<Object>;
  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;
  unitId$: Observable<string>;

  faEdit = faEdit;

  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.exercise$ = this.route.paramMap
    .pipe(map(() => window.history.state))
} 

  navigateToEdit() {}

}
