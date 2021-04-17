import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfoService } from 'src/app/services/userinfo-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() fileEmitter = new EventEmitter<File>();

  canUploadFiles: boolean = false;

  @Input() data;

  apiUri = environment.BACKEND_URL

  fileToUpload: File = null;

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.getUserinfo().subscribe(res => {
      if (res && res.providers) this.canUploadFiles = res.providers?.split(" ").includes("google")
    })
  }

  authorizeGoogleDrive($event) {
    $event.preventDefault();
    window.location.href = this.apiUri + "oauth2/google/drive?jwt=" + localStorage.getItem("jwt")
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileEmitter.emit(this.fileToUpload);
  }

  public removeFile() {
    this.fileToUpload = undefined;
    this.fileEmitter.emit(undefined);
  }

}
