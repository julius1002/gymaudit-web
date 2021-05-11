import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Unit } from "../model/unit";
import { Observable } from "rxjs";
import { Page } from "../model/page";

@Injectable({
  providedIn: "root",
})
export class UnitService {
  constructor(private httpClient: HttpClient) { }

  public get(
    id: string
  ): Observable<Unit> {
    return this.httpClient.get<Unit>(`${environment.api_url}units/${id}`);
  }

  public getByPage(
    size: number,
    page: number,
    name: string = ""
  ): Observable<Page<Unit>> {
    return this.httpClient.get<Page<Unit>>(
      `${environment.api_url}units?page=${page}&size=${size}&name_filter=${name}`
    );
  }

  public postSingle(unit: Unit): Observable<Unit> {
    return this.httpClient.post<Unit>(
      `${environment.api_url}units`,
      unit
    );
  }

  public update(unit: Unit): Observable<Unit> {
    return this.httpClient.put<Unit>(
      `${environment.api_url}units`,
      unit
    );
  }

  public delete(unitId: string) {
    return this.httpClient.delete<Unit>(
      `${environment.api_url}units/${unitId}`
    );
  }
}
