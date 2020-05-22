import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../model/page";
import { Set } from "../model/set";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SetService {
  constructor(private httpClient: HttpClient) {}

  public getAll(unitId: string, exerciseId: string): Observable<Page<Set>> {
    return this.httpClient.get<Page<Set>>(
      `${environment.BACKEND_URL}trainees/${environment.TRAINEEID}/units/${unitId}/sets?exerciseId=${exerciseId}`
    );
  }

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

  public postSet(unitId: string, exerciseId: string, set:Set): Observable<Set> {
    return this.httpClient.post<Set>(
      `${environment.BACKEND_URL}trainees/${environment.TRAINEEID}/units/${unitId}/sets?exerciseId=${exerciseId}`
    , set);
  }

  public putSet(unitId: string, exerciseId: string, set:Set): Observable<Set> {
    return this.httpClient.put<Set>(
      `${environment.BACKEND_URL}trainees/${environment.TRAINEEID}/units/${unitId}/sets?exerciseId=${exerciseId}`
    , set);
  }
}
