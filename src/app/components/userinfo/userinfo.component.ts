import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserInfoService } from 'src/app/services/userinfo-service';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  userinfo;

  providers:string[]

  constructor(private userinfoService: UserinfoService, private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.getUserinfo()
      .pipe(
        take(1),
        switchMap(userInfo => {
          if (userInfo) {
            this.userinfo = userInfo;
            return of(userInfo);
          } else {
            return this.userinfoService.getUserInfo()
          }
        })).subscribe(res => {
            this.userInfoService.setUserInfo(res)
            this.userinfo = res
            this.providers = res.providers?.split(" ")
        })

  }

  authorizeGoogleDrive($event){
    $event.preventDefault();
    window.location.href =environment.BACKEND_URL + "oauth2/google/drive?jwt=" +localStorage.getItem("jwt")
  }
}
