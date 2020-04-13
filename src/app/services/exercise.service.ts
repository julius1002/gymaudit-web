import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private httpClient:HttpClient) { }

  public getExercisesOfUnitOfTrainee(traineeId:string, unitId:string): Observable<Exercise[]>{
    return this.httpClient.get<Exercise[]>(environment.BACKEND_URL + `trainees/${traineeId}/units/${unitId}`); 
  }
}
