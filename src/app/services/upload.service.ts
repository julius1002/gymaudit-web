import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  getUploadUri(){
    const endpoint = environment.api_url + "files/uri";
    return this.httpClient.get<any>(endpoint);
  }

  post(uri, fileToUpload, accessToken:string = ""){
    const formData: FormData = new FormData();
    var metadata = {
      'name': "image", // Filename at Google Drive
      'mimeType': "image/jpeg", // mimeType at Google Drive
      'parents': ['appDataFolder'], // Folder ID at Google Drive
  };
  formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));

    formData.append('file', fileToUpload);
     return this.httpClient.post(uri, formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
  }
}
