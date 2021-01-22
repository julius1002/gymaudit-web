import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Exercise } from "../model/exercise";
import { Page } from "../model/page";

@Injectable({
  providedIn: "root",
})
export class ExerciseService {
  constructor(private httpClient: HttpClient) {}

  public getAll(unitId: string): Observable<Page<Exercise>> {
    return this.httpClient.get<Page<Exercise>>(
      `${environment.BACKEND_URL}units/${unitId}`
    );
  }

  public getByPage(
    unitId: string,
    size: number,
    page: number
  ): Observable<Page<Exercise>> {
    return this.httpClient.get<Page<Exercise>>(
      `${environment.BACKEND_URL}units/${unitId}?page=${page}&size=${size}`
    );
  }

  public getSingle(unitId: string, exerciseId: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(
      `${environment.BACKEND_URL}units/${unitId}/exercise?exerciseId=${exerciseId}`
    );
  }

  public postSingle(unitId: string, exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(
      `${environment.BACKEND_URL}units/${unitId}`,
      exercise
    );
  }

  public update(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.put<Exercise>(
      `${environment.BACKEND_URL}exercise`,
      exercise
    );
  }

  public delete(unitId: string, exerciseId: string) {
    return this.httpClient.delete<Exercise>(
      `${environment.BACKEND_URL}units/${unitId}/exercises/${exerciseId}`
    );
  }
}
