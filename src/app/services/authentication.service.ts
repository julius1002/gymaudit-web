import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = new BehaviorSubject<boolean>(false);

  authenticationUrl: string = `${environment.api_url}auth/login`;
  
  logoutUrl: string = `${environment.api_url}auth/logout`;

  constructor(private httpClient: HttpClient,
    private router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    var authorizationHeader: string = "Basic " + `${btoa(`${username}:${password}`)}`

    return this.httpClient.post(this.authenticationUrl, null, {
      headers: { 'Authorization': authorizationHeader }
    })
  }

  logout(): Observable<any> {
    return this.httpClient.delete(this.logoutUrl)
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  setAuthentication(isAuthenticated) {
    this.authenticated.next(isAuthenticated)
  }
}