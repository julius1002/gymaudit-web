import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { share, switchMap, take } from 'rxjs/operators';
import { UserInfo } from './model/userInfo';
import { AuthenticationService } from './services/authentication.service';
import { UserInfoService } from './services/userinfo-service';
import { UserinfoService } from './services/userinfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  hideMobileBar: boolean = true;

  userInfo: UserInfo;

  authenticated: boolean = false;

  @HostListener('window:scroll', ['$event']) // for window scroll events
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
    private snackBar: MatSnackBar, private route: ActivatedRoute,
    private userinfoService: UserinfoService, private userInfoService: UserInfoService) {

    this.userInfoService.getUserinfo().subscribe(userInfo => this.userInfo = userInfo)
    this.authenticationService.isAuthenticated()
      .subscribe(auth => this.authenticated = auth)




  }
  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.authenticationService.setAuthentication(true)
      this.userInfoService.getUserinfo()
        .pipe(
          take(1),
          share(),
          switchMap(userInfo => {
            if (userInfo) {
              this.userInfo = userInfo;
            } else {
              return this.userinfoService.getUserInfo()
            }
          })).subscribe(res => {
            this.userInfo = res
            this.userInfoService.setUserInfo(res)
          })


    }
  }



  logout(): void {
    if (confirm("Are you sure you want to log out?")) {


      this.authenticationService.logout().subscribe(res => {
        this.authenticationService.setAuthentication(false)
        this.userInfoService.setUserInfo(undefined)
        this.openSnackBar("Successfully logged out!", "Ok")
        if (localStorage.getItem("jwt")) {
          localStorage.removeItem("jwt")
        }
        this.router.navigate(["/login"])
      }, (err) => {
        this.openSnackBar("An error occured", "Ok")
      }
      );

    }
  }



  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  public toggleMobileBar() {
    var drawerList: HTMLCollection = document.getElementById('drawer-list').children
    if (!document.getElementsByClassName("drawer")[0].classList.contains("is-open")) {
      for (let i = 1; i < drawerList.length; i++) {
        //(<HTMLElement>drawerList[i]).style.setProperty
      }
    }

    document.getElementsByClassName("drawer")[0].classList.toggle("is-open")

  }
}
