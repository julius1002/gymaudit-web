import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/page';
import { Set } from '../model/set';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private httpClient:HttpClient) { }

  public getByPage(
    unitId: string,
    exerciseId: string,
    size: number,
    page: number
  ): Observable<Page<Set>> {
    return this.httpClient.get<Page<Set>>(
      `${environment.BACKEND_URL}trainees/${environment.TRAINEEID}/units/${unitId}/sets?exerciseId=${exerciseId}&page=${page}&size=${size}`
    );
  }
}