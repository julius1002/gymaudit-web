import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private httpClient: HttpClient) { }

  fetchByPage(pageSize: number, start: number, searchValue: string) {
    return searchValue ? this.httpClient.get(environment.api_url + "search?username=" + searchValue) : EMPTY;
  }

  getUserDetails(username: string) {
    return this.httpClient.get(environment.api_url + "details?username=" + username);
  }

  getUnitsOfUser(username: string, size: number, page: number): Observable<Page<any>> {
    return this.httpClient.get<Page<any>>(environment.api_url + "user/units?username=" + username + "&page=" + page + "&size=" + size);
  }

}
