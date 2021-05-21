import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserInfoService } from 'src/app/services/userinfo-service';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService, private userinfoService: UserinfoService,
    private userInfoService: UserInfoService, private alertService:AlertService) { }

  ngOnInit(): void {

    const params = new URLSearchParams(window.location.search)

    var token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token)
      this.userinfoService.getUserInfo().subscribe(res => {
        this.userInfoService.setUserInfo(res)
        this.alertService.openSnackBar(`Willkommen ${res.name.split(" ")[0]}!`, "Ok")
        this.authenticationService.setAuthentication(true);
        this.router.navigate([".."])
      })
    }
  }
}
