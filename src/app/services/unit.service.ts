import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Unit } from '../model/unit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  
  constructor(private httpClient:HttpClient) { }

  public getUnitsOfTrainee(traineeId:string): Observable<Unit>{
    return this.httpClient.get<Unit>(environment.BACKEND_URL + `trainees/${traineeId}/units`); 
  }
}
