import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserInfo } from 'src/app/model/userInfo';
import { UserInfoService } from 'src/app/services/userinfo-service';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  $userInfo: Observable<UserInfo>;

  constructor(private userinfoService: UserinfoService, private userInfoService: UserInfoService) { }

  ngOnInit(): void {

    this.$userInfo = this.userInfoService.getUserinfo()
      .pipe(
        take(1),
        switchMap(userInfo => {
          this.userInfoService.setUserInfo(userInfo)
          if (userInfo) {
            return of(userInfo);
          } else {
            return this.userinfoService.getUserInfo()
          }
        }))
  }

  authorizeGoogleDrive($event) {
    $event.preventDefault();
    window.location.href = environment.api_url + "oauth2/google/drive?jwt=" + localStorage.getItem("jwt")
  }
}
