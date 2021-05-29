import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { UserInfo } from 'src/app/model/userInfo';
import { UserInfoForm } from 'src/app/model/userinfoForm';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserInfoService } from 'src/app/services/userinfo-service';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userinfo-form',
  templateUrl: './userinfo-form.component.html',
  styleUrls: ['./userinfo-form.component.scss']
})
export class UserinfoFormComponent implements OnInit {

  userInfo:UserInfo;
  userInfoFormGroup:FormGroup;

  day = new FormControl()
  month = new FormControl()
  year = new FormControl()

  months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

  constructor(private userinfoService: UserinfoService,
     private userInfoService: UserInfoService,
      private router:Router,
      private authenticationService:AuthenticationService,
    private alertService:AlertService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.userInfoService.getUserinfo()
    .pipe(
      take(1),
      switchMap(userInfo => {
        if (userInfo) {
          return of(userInfo);
        } else {
          return this.userinfoService.getUserInfo()
        }
      })).subscribe(res => {
          this.userInfoService.setUserInfo(res)
          this.userInfo = res
          this.initForm();
      this.setFormValues(res)
      })
}

private setFormValues(userInfo: UserInfo) {
  this.userInfoFormGroup.patchValue(userInfo);

  var date = userInfo.birthday ? new Date(userInfo.birthday) : new Date()
  this.setDateValues(date)
}

private setDateValues(date:Date){
var month = date.getUTCMonth() + 1;
var year = date.getUTCFullYear();
this.day.setValue(date.getDate())
this.month.setValue(this.months[month-1])
this.year.setValue(year)
}

private initForm() {
  if (this.userInfoFormGroup) {
    return;
  }

  this.userInfoFormGroup = this.formBuilder.group({
    name: new FormControl({
      value: "",
      disabled: ["facebook", "google"].includes(this.userInfo.provider)
    }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]),
    day: this.day,
    month: this.month,
    year: this.year,
    email: [{
      value: "",
      disabled: ["facebook", "google"].includes(this.userInfo.provider)
    }, Validators.email],
  });
}

public noValueChanged():boolean{
  const formValue = this.userInfoFormGroup.getRawValue();
  var date = new Date(this.userInfo.birthday)
  var month = date.getUTCMonth() + 1;
var year = date.getUTCFullYear();

  return date.getDate() == formValue.day && year == formValue.year && this.months[month-1] == formValue.month && this.userInfo.name === formValue.name && this.userInfo.email === formValue.email;
}

  deleteAccount(){
    if(!confirm("Beim Fortfahren werden Ihre gespeicherten Daten permanent gelöscht. Möchten Sie diesen Account löschen?")){
      return;
    }
      this.userinfoService.deleteAccount().subscribe(() => {
        this.router.navigate(["/login"])
        this.authenticationService.setAuthentication(false);
        localStorage.removeItem("jwt")
        this.alertService.openSnackBar("Ihre Daten wurden erfolgreich gelöscht!", "Ok")
      }, (err) => {
        this.alertService.openSnackBar("Es ist ein Fehler aufgetreten.", "Ok")

      })
  }

  authorizeGoogleDrive($event){
    $event.preventDefault();
    window.location.href =environment.api_url + "oauth2/google/drive?jwt=" +localStorage.getItem("jwt")
  }


submitForm() {
  
  if(!confirm("Sind die Daten korrekt?")){
    return;
  }
  const formValue = this.userInfoFormGroup.getRawValue();
  
  var date =  formValue.year + "/" + (this.months.indexOf(formValue.month) +1 )  + "/" + formValue.day

  var userInfoForm:UserInfoForm = { 
    name: formValue.name,
    birthday: new Date(date),
    email: formValue.email
  }
  this.userinfoService.updateUserInfo(userInfoForm).subscribe(res => {
    this.userInfoService.setUserInfo(res)
    this.alertService.openSnackBar("Ihre Daten wurden erfolgreich aktualisiert!", "Ok")
  this.router.navigate(["userinfo"])}
    ,(err) =>{
      this.alertService.openSnackBar("Es ist ein Fehler aufgetreten.", "Ok")
    })
}

revokeGoogleDrive(){
  if(!confirm("Möchten Sie Google Drive von ihrem Konto entfernen?")){
    return;  
  }
  this.userinfoService.revoke().subscribe(res => {
    this.userInfoService.setUserInfo(res)
    this.userInfo = res
    this.alertService.openSnackBar("Google Drive wurde erfolgreich von Ihrem Konto entfernt!", "Ok")
  },(err) => this.alertService.openSnackBar("Es ist ein Fehler aufgetreten.", "Ok"))
}

}
