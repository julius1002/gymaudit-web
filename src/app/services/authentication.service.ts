import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    var authorization: string = "Basic " + `${btoa(`${username}:${password}`)}`

    return this.httpClient.post(`${environment.BACKEND_URL}auth/login`, null, {
      headers: { 'Authorization': authorization }
    })
  }

  logout(): Observable<any> {
    return this.httpClient.delete(`${environment.BACKEND_URL}auth/logout`)
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  setAuthenticated(isAuthenticated) {
    this.authenticated.next(isAuthenticated)
  }

}