import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image-service';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService,private userinfoService:UserinfoService,
     private imageService:ImageService ,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search)
    if (params.get("token")) {
      localStorage.setItem("jwt", params.get("token"))
      this.authenticationService.setAuthentication(true);
      this.router.navigate([".."])
      if (params.get("name")) {
        this.openSnackBar(`Willkommen ${params.get("name").split(" ")[0]}!`, "Ok")
      }
      this.userinfoService.getUserInfo().subscribe(res =>{
          this.imageService.setImageUri(res?.picture?.data?.url)        
      })

    }
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
