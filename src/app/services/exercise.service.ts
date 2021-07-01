import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Exercise } from "../model/exercise";
import { Page } from "../model/page";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ExerciseService {

  private exercises = new BehaviorSubject<Page<Exercise>>(undefined)

  constructor(private httpClient: HttpClient) {

  }

  public getExercises(unitId) {
    return this.httpClient.get<Page<Exercise>>(
      `${environment.api_url}exercises/${unitId}?page=${0}&size=${8}&name_filter=`
    ).pipe(
      tap((exercises => this.exercises.next(exercises))
      ), map(exercisesPage => {
        exercisesPage.content = exercisesPage.content.filter(exercise => exercise.unitId === unitId)
        return exercisesPage;
      }));
  }

  public fetchByPage(
    unitId: string,
    size: number,
    page: number,
    name: string = ""
  ): Observable<Page<Exercise>> {
    return this.httpClient.get<Page<Exercise>>(
      `${environment.api_url}exercises/${unitId}?page=${page}&size=${size}&name_filter=${name}`
    ).pipe(tap(exercises => {
      this.exercises.value.content.concat(exercises.content)
      this.exercises.next(this.exercises.value)
    }));
  }



  public get(exerciseId: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(
      `${environment.api_url}exercise/${exerciseId}`
    );
  }

  public postSingle(unitId: string, exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(
      `${environment.api_url}exercises/${unitId}`,
      exercise
    );
  }

  public update(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.put<Exercise>(
      `${environment.api_url}exercises`,
      exercise
    );
  }

  public delete(unitId: string, exerciseId: string) {
    return this.httpClient.delete<Exercise>(
      `${environment.api_url}exercises/${unitId}/delete/${exerciseId}`
    );
  }
}
