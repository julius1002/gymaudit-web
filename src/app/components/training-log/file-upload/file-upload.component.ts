import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfo } from 'src/app/model/userInfo';
import { UserInfoService } from 'src/app/services/userinfo-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() fileEmitter = new EventEmitter<File>();

  @Input() data;

  maxFileMegaBytes: number = 10;

  selectedFile: File;

  userInfo: UserInfo;

  environment = environment

  jwt = localStorage.getItem("jwt")

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.getUserinfo().subscribe(userInfo => this.userInfo = userInfo)
  }

  handleFileInput(files: FileList) {
    var file = files.item(0);
    console.log(file)

    if (!(file.size < (this.maxFileMegaBytes * Math.pow(1024, 2)))) {
      alert(`Das Bild darf ${this.maxFileMegaBytes} nicht übersteigen`)
    } else {
      this.selectedFile = file
      this.fileEmitter.emit(file);
    }
  }

  public removeFile() {
    this.selectedFile = undefined
    this.fileEmitter.emit(undefined);
  }

}
