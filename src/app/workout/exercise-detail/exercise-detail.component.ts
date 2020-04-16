import { Component, OnInit, Input } from "@angular/core";
import { Exercise, ExerciseType, MuscleGroup } from "src/app/model/exercise";
import { faEdit, faTrash} from  '@fortawesome/free-solid-svg-icons';


@Component({
  selector: "app-exercise-detail",
  templateUrl: "./exercise-detail.component.html",
  styleUrls: ["./exercise-detail.component.scss"],
})
export class ExerciseDetailComponent implements OnInit {
  @Input() exercise: Exercise;
  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;

  faEdit = faEdit;
  faTrash = faTrash;
  
  constructor() {}

  ngOnInit(): void {
  }
}
