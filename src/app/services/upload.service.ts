import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = environment.api_url + "files";
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
