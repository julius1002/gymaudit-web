import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  Inject,
} from "@angular/core";
import { Unit } from "src/app/model/unit";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UploadService } from "src/app/services/upload.service";
import { environment } from "src/environments/environment";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-unit-form",
  templateUrl: "./unit-form.component.html",
  styleUrls: ["./unit-form.component.scss"],
})
export class UnitFormComponent implements OnInit {
  @Input() editing = false;
  @Output() submitUnit = new EventEmitter<Unit>();
  @Output() deleteUnit = new EventEmitter<Unit>();

  unitForm: FormGroup;

  fileToUpload: File = null;

  isLoading: boolean = false;

  progress: number;

  mode: ProgressSpinnerMode = 'determinate';

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: Unit) { }

  ngOnInit(): void {

    this.initForm();
    if (this.editing) {
      this.setFormValues(this.data);
    }
  }

  get name() { return this.unitForm.get('name'); }

  get description() { return this.unitForm.get('description'); }

  authorizeGoogleDrive($event) {
    $event.preventDefault();
    window.location.href = environment.api_url + "oauth2/google/drive?jwt=" + localStorage.getItem("jwt")
  }

  getHeading(): string {
    return this.editing ? "Einheit bearbeiten" : "Einheit hinzufügen";
  }


  fileEmitted($event: File) {
    this.fileToUpload = $event
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
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18)]),
      description: new FormControl("", [
        Validators.maxLength(100)]),
    });
  }

  imageDeleted($event) {
    if ($event) {
      this.data.fileId = null;
    }
  }


  submitForm() {
    const formValue = this.unitForm.value;
    var id;
    var date;
    var traineeId;
    var fileId;
    if (this.editing) {
      id = this.data.id;
      traineeId = this.data.traineeId;
      fileId = this.data.fileId;
    }
    if (this.fileToUpload) {
      this.isLoading = true;
      this.uploadService.getUploadUri().pipe(
        switchMap(res => this.uploadService.post(res.uri, this.fileToUpload, res.token))
      ).subscribe((event: HttpEvent<any>) => {
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
            const newUnit: Unit = {
              id: id,
              name: formValue.name,
              description: formValue.description,
              traineeId: traineeId,
              fileId: event.body.id
            };
            this.isLoading = false;

            this.submitUnit.emit(newUnit);
            this.unitForm.reset;
        }
      })
    } else {
      const newUnit: Unit = {
        id: id,
        name: formValue.name,
        description: formValue.description,
        traineeId: traineeId,
        fileId: this.data?.fileId
      };
      this.isLoading = false;
      this.submitUnit.emit(newUnit);
      this.unitForm.reset;
    }
    this.submitted = true;
  }
}
