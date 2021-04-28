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
  constructor(private httpClient: HttpClient) { }

  public getSets(exerciseId: string, isoDate: string = new Date().toISOString()): Observable<Set[]> {
    return this.httpClient.get<Set[]>(`${environment.api_url}sets/${exerciseId}?date=${isoDate}`)
  }

  public getByPage(
    unitId: string,
    exerciseId: string,
    size: number,
    page: number
  ): Observable<Page<Set>> {
    return this.httpClient.get<Page<Set>>(
      `${environment.api_url}units/${unitId}/sets?exerciseId=${exerciseId}&page=${page}&size=${size}`
    );
  }

  public getTodaysSetsByPage(
    unitId: string,
    exerciseId: string,
    size: number,
    page: number
  ): Observable<Page<Set>> {
    return this.httpClient.get<Page<Set>>(
      `${environment.api_url}units/${unitId}/sets/today?exerciseId=${exerciseId}&page=${page}&size=${size}`
    );
  }

  public postSet(exerciseId: string, set: Set): Observable<Set> {
    return this.httpClient.post<Set>(
      `${environment.api_url}sets/${exerciseId}`
      , set);
  }

  public put(exerciseId: string, setId: string, set: Set): Observable<Set> {
    return this.httpClient.put<Set>(
      `${environment.api_url}sets/${exerciseId}?setId=${setId}`, set);
  }

  public delete(exerciseId: string, setId: string) {
    return this.httpClient.delete<Set>(
      `${environment.api_url}sets/${exerciseId}?setId=${setId}`
    )
  }
}
