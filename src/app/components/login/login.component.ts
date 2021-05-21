import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert/alert.service';
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
  environment;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.environment = environment

    this.authenticationService.isAuthenticated().pipe(take(1))
      .subscribe((authenticated: boolean) => {
        if (authenticated) {
          this.router.navigate(["/training-log/units"]);
        }
      })

    this.initForm();
  }

  authorizeGoogleDrive(jwt: string) {
    window.location.href = environment.api_url + "oauth2/google/drive?jwt=" + jwt
  }


  private initForm() {
    if (this.loginForm) {
      return;
    }
    var credentials = {
      username: [""],
      password: [""]
    };
    this.loginForm = this.formBuilder.group(credentials);
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
          this.alertService.openSnackBar("Successfully logged in!", "Ok")
        }
      }
    }, (err) => {
      err.status == 401 ? this.alertService.openSnackBar("Ungültige Benutzerdaten", "Ok") : this.alertService.openSnackBar("Server derzeit nicht verfübar", "Ok")
    });
  }


}
