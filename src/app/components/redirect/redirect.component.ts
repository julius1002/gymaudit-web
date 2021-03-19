import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Router } from '@angular/router';
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
    private imageService: UserInfoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    const params = new URLSearchParams(window.location.search)

    var token = params.get("token");

    if (token) {

      localStorage.setItem("jwt", token)

      this.authenticationService.setAuthentication(true);

      this.userinfoService.getUserInfo().subscribe(res => {
        this.imageService.setUserInfo(res)
        this.openSnackBar(`Willkommen ${res.name.split(" ")[0]}!`, "Ok")

        this.router.navigate([".."])
      })
    }
  }


  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
