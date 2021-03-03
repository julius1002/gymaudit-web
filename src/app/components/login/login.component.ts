import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  hide: boolean = true;

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
        this.openSnackBar("Successfully logged in!", "Ok")
      }
    }, (err) => {
      err.status == 401 ? this.openSnackBar("Bad username or password", "Ok") : this.openSnackBar("Server unavailable", "Ok")
    });
  }


}
