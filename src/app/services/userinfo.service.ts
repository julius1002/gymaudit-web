import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../model/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private httpClient: HttpClient) {}

  public getUserInfo(
  ): Observable<UserInfo> {
    return this.httpClient.get<any>(
      `${environment.BACKEND_URL}me/profile`
    );
  }
}
