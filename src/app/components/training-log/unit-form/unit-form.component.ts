import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  Inject,
} from "@angular/core";
import { Unit } from "src/app/model/unit";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UnitService } from "src/app/services/unit.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UnitListService } from "src/app/services/unit-list.service";
import { AddUnitDialogComponent } from "../add-unit-dialog/add-unit-dialog.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UploadService } from "src/app/services/upload.service";
import { environment } from "src/environments/environment";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { UserInfoService } from "src/app/services/userinfo-service";

@Component({
  selector: "app-unit-form",
  templateUrl: "./unit-form.component.html",
  styleUrls: ["./unit-form.component.scss"],
})
export class UnitFormComponent implements OnInit {
  @Input() editing = false;
  @Output() submitUnit = new EventEmitter<Unit>();
  unitForm: FormGroup;

  fileToUpload: File = null;

  isLoading: boolean = false;
  progress: number;
  mode: ProgressSpinnerMode = 'determinate';

  canUploadFiles: boolean = false;

  apiUri = environment.BACKEND_URL;
  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private uploadService: UploadService,
    private userInfoService: UserInfoService,
    @Inject(MAT_DIALOG_DATA) public data:Unit ) { }

  ngOnInit(): void {

    this.userInfoService.getUserinfo().subscribe(res => {

      if(res && res.providers) this.canUploadFiles = res.providers?.split(" ").includes("google")
    })

    this.initForm();
    if (this.editing) {
      this.setFormValues(this.data);
    }
  }
  authorizeGoogleDrive($event){
    $event.preventDefault();
    window.location.href =environment.BACKEND_URL + "oauth2/google/drive?jwt=" +localStorage.getItem("jwt")
  }

  getHeading(): string {
    return this.editing ? "Einheit bearbeiten" : "Einheit hinzufügen";
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }

  public removeFile() {
    this.fileToUpload = undefined;
  }



  private setFormValues(unit: Unit) {
    this.unitForm.patchValue(unit);

    this.unitForm.setValue({
      name: unit.name,
      description: unit.description,
    });
  }

  private initForm() {
    if (this.unitForm) {
      return;
    }

    this.unitForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: [""],
    });
  }


  submitForm() {
    const formValue = this.unitForm.value;
    var id;
    var date;
    var traineeId;
    var fileId;
    if (this.editing) {
      id = this.data.id;
      date = this.data.date;
      traineeId = this.data.traineeId;
      fileId =this.data.fileId.split("?jwt=")[0]
    }
    if (this.fileToUpload) {
      this.isLoading = true;
      this.uploadService.postFile(this.fileToUpload)
        // do something, if upload success
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              break;
            case HttpEventType.Response:
              setTimeout(() => {
                this.progress = 0;
              }, 4);
              var filePath = event.body.id;
              const newUnit: Unit = {
                id: id,
                date: date,
                name: formValue.name,
                description: formValue.description,
                traineeId: traineeId,
                fileId: event.body.id
              }; this.isLoading = false;

              this.submitUnit.emit(newUnit);
              this.unitForm.reset;
          }
        })
    } else {
      const newUnit: Unit = {
        id: id,
        date: date,
        name: formValue.name,
        description: formValue.description,
        traineeId: traineeId,
        fileId: fileId
      };
      this.isLoading = false;
      this.submitUnit.emit(newUnit);
      this.unitForm.reset;
    }
    this.removeFile();





  }
}
