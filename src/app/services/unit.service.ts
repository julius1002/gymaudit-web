import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Unit } from "../model/unit";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UnitService {
  constructor(private httpClient: HttpClient) {}

  public getSingle(traineeId: string): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(
      environment.BACKEND_URL + `trainees/${traineeId}/units`
    );
  }

  public postSingle(unit: Unit): Observable<Unit> {
    return this.httpClient.post<Unit>(
      `${environment.BACKEND_URL}trainees/${environment.TRAINEEID}/units`,
      unit
    );
  }

  public update(unit: Unit): Observable<Unit> {
    return this.httpClient.put<Unit>(
      `${environment.BACKEND_URL}trainees/${environment.TRAINEEID}/units`,
      unit
    );
  }

  public delete(unitId: string) {
    return this.httpClient.delete<Unit>(
      `${environment.BACKEND_URL}trainees/${environment.TRAINEEID}/units/${unitId}`
    );
  }
}
