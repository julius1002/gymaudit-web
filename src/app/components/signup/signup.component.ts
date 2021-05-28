import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

  hide: boolean = true;

  public signUpForm: FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  day = new FormControl()
  month = new FormControl()
  year = new FormControl()

  password = new FormControl("")
  confirmPassword = new FormControl("")
  ngOnInit(): void {
    this.initForm();  
    this.setDateValues(new Date())
  }

  private initForm() {
    if (this.signUpForm) {
      return;
    }
    var credentials = {
      firstName: [""],
      lastName: [""],
      email: [""],
      password: this.password,
      confirmPassword: this.confirmPassword,
      day:this.day,
      year:this.year,
      month:this.month
    };
    this.signUpForm = this.formBuilder.group(credentials);
  }

  private setDateValues(date:Date){
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();
    this.day.setValue(date.getDate())
    this.month.setValue(this.months[month-1])
    this.year.setValue(year)
    }

  async submitForm() {/*
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
    });*/
  }

}
