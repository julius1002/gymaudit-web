import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = new BehaviorSubject<boolean>(false);

  authenticationUrl: string = `${environment.BACKEND_URL}auth/login`;
  logoutUrl: string = `${environment.BACKEND_URL}auth/logout`;

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

  navigateToIfAlreadyAuthenticated(navigationPath: string) {
    this.isAuthenticated().pipe(take(1))
      .subscribe((authenticated: boolean) => {
        if (authenticated) {
          this.router.navigate([navigationPath]);
        }
      }
      )
  }

}