import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../model/userInfo';
import { UserInfoForm } from '../model/userinfoForm';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  userInfo = new BehaviorSubject<UserInfo>(undefined);

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem("jwt")) {
      this.httpClient.get<any>(
        `${environment.api_url}me/profile`
      ).subscribe(userInfo => this.userInfo.next(userInfo));
    }
  }

  fetchUserInfo() {
    return this.httpClient.get<any>(
      `${environment.api_url}me/profile`
    ).pipe(tap(userInfo => this.userInfo.next(userInfo)));
  }

  public getUserInfo(
  ): Observable<UserInfo> {
    return this.userInfo.asObservable();
  }

  public deleteAccount(
  ): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api_url}auth/deregister`
    );
  }

  public updateUserInfo(userInfoForm: UserInfoForm
  ): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.api_url}me/profile`, userInfoForm
    ).pipe(tap(result => this.userInfo.next(result)));
  }
  public revoke(): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api_url}auth/revoke`
    ).pipe(tap(result => this.userInfo.next(result)));
  }

  public logout() {
    this.userInfo.next(undefined)
  }
}
