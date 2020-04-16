import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Set } from '../model/set';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private httpClient:HttpClient) { }

  public getSetsOfExerciseOfUnitOfTrainee(traineeId:string, unitId:string, exerciseId): Observable<Set[]>{
    return this.httpClient.get<Set[]>(environment.BACKEND_URL + `trainees/${traineeId}/units/${unitId}/exercises?exerciseId=${exerciseId}`); 
  }
}
