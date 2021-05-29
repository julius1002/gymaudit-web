import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../model/userInfo';
import { UserInfoForm } from '../model/userinfoForm';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private httpClient: HttpClient) {}

  public getUserInfo(
  ): Observable<UserInfo> {
    return this.httpClient.get<any>(
      `${environment.api_url}me/profile`
    );
  }

  public deleteAccount(
    ): Observable<any> {
      return this.httpClient.delete<any>(
        `${environment.api_url}auth/deregister`
      );
    }

    public updateUserInfo(userInfoForm:UserInfoForm
      ): Observable<any> {
        return this.httpClient.put<any>(
          `${environment.api_url}me/profile`, userInfoForm
        );
      }
      public revoke(): Observable<any> {
          return this.httpClient.delete<any>(
            `${environment.api_url}auth/revoke`
          );
        }
}
