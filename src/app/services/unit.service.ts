import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Unit } from "../model/unit";
import { BehaviorSubject, Observable } from "rxjs";
import { Page } from "../model/page";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UnitService {

  private units = new BehaviorSubject<Page<Unit>>(undefined)

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Page<Unit>>(
      `${environment.api_url}units?page=${0}&size=${5}&name_filter=`
    ).subscribe(units => this.units.next(units));
  }

  public get(
    id: string
  ): Observable<Unit> {
    return this.httpClient.get<Unit>(`${environment.api_url}units/${id}`);
  }

  public getUnits() {
    return this.units.asObservable();
  }

  public fetchByPage(
    size: number,
    page: number,
    name: string = ""
  ): Observable<Page<Unit>> {
    return this.httpClient.get<Page<Unit>>(
      `${environment.api_url}units?page=${page}&size=${size}&name_filter=${name}`
    ).pipe(tap(units => {
      this.units.value.content.concat(units.content)
      this.units.next(this.units.value)
    }));
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
