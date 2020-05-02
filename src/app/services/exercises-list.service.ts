import { Injectable, EventEmitter, Output } from "@angular/core";
import { Exercise } from "../model/exercise";

@Injectable({
  providedIn: "root",
})
export class ExercisesListService {
  @Output() exerciseList: EventEmitter<Exercise> = new EventEmitter();
  @Output() updateExerciseList: EventEmitter<Exercise> = new EventEmitter();

  constructor() {}

  updateListEvent(exercise:Exercise) {
    this.exerciseList.emit(exercise);
  }

  addToListEvent(exercise:Exercise){
    this.updateExerciseList.emit(exercise);
  }
}
