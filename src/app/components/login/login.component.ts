import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  hide: boolean = true;
  apiUri: string = environment.BACKEND_URL;

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.authenticationService.navigateToIfAlreadyAuthenticated("/training-log/units");
    this.initForm();
  }
  loginWithFacebook($event) {
    $event.preventDefault();
    window.location.href = this.apiUri + "oauth2/facebook"
  }

  loginWithGoogle($event) {
    $event.preventDefault();
    window.location.href = this.apiUri + "oauth2/google"
  }


  authorizeGoogleDrive(jwt: string) {
    window.location.href = this.apiUri + "oauth2/google/drive?jwt=" + jwt
  }


  private initForm() {
    if (this.loginForm) {
      return;
    }

    var groupObj = {
      username: [""],
      password: [""]
    };

    this.loginForm = this.formBuilder.group(groupObj);


  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async submitForm() {
    const formValue = this.loginForm.value;
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt")
    }
    this.authenticationService.login(formValue.username, formValue.password).subscribe(res => {
      if (res) {
        
        this.authenticationService.setAuthentication(true)

        localStorage.setItem("jwt", res.token)

        this.router.navigate(["/"])

        if (res.provider == "google") {
          this.authorizeGoogleDrive(res.token);
        } else {

          this.openSnackBar("Successfully logged in!", "Ok")
        }
      }
    }, (err) => {
      err.status == 401 ? this.openSnackBar("Bad username or password", "Ok") : this.openSnackBar("Server unavailable", "Ok")
    });
  }


}
