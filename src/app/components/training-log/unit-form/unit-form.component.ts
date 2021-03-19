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
import { MatDialogRef } from "@angular/material/dialog";
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
  @Input() data;
  unitForm: FormGroup;

  fileToUpload: File = null;

  isLoading: boolean = false;
  progress: number;
  mode: ProgressSpinnerMode = 'determinate';

  canUploadFiles: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private unitListService: UnitListService,
    private dialogRefAdd: MatDialogRef<AddUnitDialogComponent>,
    private uploadService: UploadService,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit(): void {

    this.userInfoService.getUserinfo().subscribe(res => {

      if(res && res.providers) this.canUploadFiles = res.providers?.split(" ").includes("google")
    })

    this.initForm();
    if (this.editing) {
      this.setFormValues(this.data.unit);
    }
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
    if (this.editing) {
      id = this.data.unit.id;
      date = this.data.unit.date;
      traineeId = this.data.unit.traineeId;
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
        fileId: null
      };
      this.isLoading = false;
      this.submitUnit.emit(newUnit);
      this.unitForm.reset;
    }
    this.removeFile();





  }
}
