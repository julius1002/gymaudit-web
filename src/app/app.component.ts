import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  hideMobileBar:boolean =true;

  @HostListener('window:scroll', ['$event']) // for window scroll events
onScroll(event) {
  if(document.getElementsByClassName("drawer")[0].classList.contains("is-open")){
    this.toggleMobileBar();
  }
}

@HostListener('document:click', ['$event'])
clickout(event) {
  if(!document.getElementsByClassName("nav-left")[0].contains(event.target)) {
    if(document.getElementsByClassName("drawer")[0].classList.contains("is-open")){
      this.toggleMobileBar();
    }
  } 
}

  constructor(public authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    if (localStorage.getItem("jwt")) {
      this.authenticationService.setAuthentication(true)
    }
     
  }

  logout(): void {
    if (confirm("Are you sure you want to log out?")) {


      this.authenticationService.logout().subscribe(res => {
        this, this.authenticationService.setAuthentication(false)
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
  public toggleMobileBar(){
    var drawerList:HTMLCollection= document.getElementById('drawer-list').children
    if(!document.getElementsByClassName("drawer")[0].classList.contains("is-open")){
      for(let i = 1; i<drawerList.length; i++){
        //(<HTMLElement>drawerList[i]).style.setProperty
      }
    }
    
    console.log(drawerList[0])
    document.getElementsByClassName("drawer")[0].classList.toggle("is-open")
    
  }
}
