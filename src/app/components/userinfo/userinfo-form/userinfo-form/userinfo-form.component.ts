import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { UserInfo } from 'src/app/model/userInfo';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserInfoService } from 'src/app/services/userinfo-service';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userinfo-form',
  templateUrl: './userinfo-form.component.html',
  styleUrls: ['./userinfo-form.component.scss']
})
export class UserinfoFormComponent implements OnInit {

  userInfo:UserInfo;

  constructor(private userinfoService: UserinfoService,
     private userInfoService: UserInfoService,
      private router:Router,
      private authenticationService:AuthenticationService,
    private alertService:AlertService) { }

  ngOnInit(): void {
    this.userInfoService.getUserinfo()
    .pipe(
      take(1),
      switchMap(userInfo => {
        if (userInfo) {
          return of(userInfo);
        } else {
          return this.userinfoService.getUserInfo()
        }
      })).subscribe(res => {
          this.userInfoService.setUserInfo(res)
          this.userInfo = res
      })
}


  deleteAccount(){
    if(confirm("Beim Fortfahren werden Ihre gespeicherten Daten permanent gelöscht. Möchten Sie diesen Account löschen?")){
      this.userinfoService.deleteAccount().subscribe(() => {
        this.router.navigate(["/login"])
        this.authenticationService.setAuthentication(false);
        localStorage.removeItem("jwt")
        this.alertService.openSnackBar("Ihre Daten wurden erfolgreich gelöscht!", "Ok")
      })
    }
  }

  authorizeGoogleDrive($event){
    $event.preventDefault();
    window.location.href =environment.api_url + "oauth2/google/drive?jwt=" +localStorage.getItem("jwt")
  }

}
