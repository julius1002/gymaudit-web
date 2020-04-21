import { Injectable } from "@angular/core";
import { Exercise } from "../model/exercise";
import { Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExercisesListService {
  exercises$: Subject<Exercise[]> = new Subject();

  constructor() {}

  public subscribe(next?: () => void): Subscription {
    return this.exercises$.subscribe(() => {
      next();
    });
  }

  public pushExercise(exercise:Exercise){
  }
}
