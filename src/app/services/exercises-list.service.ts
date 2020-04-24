import { Injectable, EventEmitter, Output } from "@angular/core";
import { Exercise } from "../model/exercise";
import { Subject, Subscription, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExercisesListService {
  @Output() exerciseList: EventEmitter<Exercise> = new EventEmitter();

  constructor() {}

  updateListEvent(exercise:Exercise) {
    this.exerciseList.emit(exercise);
  }
}
