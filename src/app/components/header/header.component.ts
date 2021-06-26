import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/model/userInfo';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  burgerMenuVisible: boolean = true;

  userInfo: UserInfo;

  authenticated: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (document.getElementsByClassName("drawer")[0].classList.contains("is-open")) {
      this.toggleMobileBar();
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!document.getElementsByClassName("nav-left")[0].contains(event.target)) {
      if (document.getElementsByClassName("drawer")[0].classList.contains("is-open")) {
        this.toggleMobileBar();
      }
    }
  }

  constructor(public authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private userInfoService: UserinfoService) {

    this.userInfoService.getUserInfo().subscribe(userInfo => this.userInfo = userInfo)

    this.authenticationService.isAuthenticated()
      .subscribe(auth => this.authenticated = auth)
  }

  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.authenticationService.setAuthentication(true)
      this.userInfoService.getUserInfo()
        .subscribe(res => {
          this.userInfo = res
        })
    }
  }

  logout(): void {
    if (confirm("Sicher ausloggen?")) {
      this.authenticationService.logout().subscribe(res => {
        this.authenticationService.setAuthentication(false)
        this.userInfoService.logout()
        this.alertService.openSnackBar("Erfolgreich ausgeloggt!", "Ok")
        if (localStorage.getItem("jwt")) {
          localStorage.removeItem("jwt")
        }
        this.router.navigate(["/login"])
      }, (err) => {
        this.alertService.openSnackBar("Es ist ein Fehler aufgetreten", "Ok")
      }
      );
    }
  }

  public toggleMobileBar() {
    this.burgerMenuVisible = !this.burgerMenuVisible
    document.getElementsByClassName("drawer")[0].classList.toggle("is-open")
  }

}
