import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'gymaudit-web';
  constructor(public authenticationService:AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    if(localStorage.getItem("jwt")){
      this.authenticationService.setAuthenticated(true)
    }
  }

  logout(): void {
    if (confirm("Are you sure you want to log out?")) {


      this.authenticationService.logout().subscribe(res => {
        this, this.authenticationService.setAuthenticated(false)
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
}
