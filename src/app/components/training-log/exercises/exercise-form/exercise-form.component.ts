import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { Exercise, ExerciseType, MuscleGroup } from "src/app/model/exercise";

import { ActivatedRoute } from "@angular/router";

import { environment } from "src/environments/environment";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { UploadService } from "src/app/services/upload.service";
import { UserInfoService } from "src/app/services/userinfo-service";

@Component({
  selector: "app-exercise-form",
  templateUrl: "./exercise-form.component.html",
  styleUrls: ["./exercise-form.component.scss"],
})
export class ExerciseFormComponent implements OnInit {
  @Input() editing = false;

  @Output() submitExercise = new EventEmitter<Exercise>();

  @Output() deleteExercise = new EventEmitter<Exercise>();

  exerciseForm: FormGroup;

  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;

  exerciseInformationVisible: boolean = true;

  fileToUpload: File = null;

  isLoading: boolean = false;
  progress: number;
  mode: ProgressSpinnerMode = 'determinate';

  keys = Object.keys;

  canUploadFiles: boolean = false;

  apiUri = environment.api_url;
  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private userInfoService: UserInfoService,
    @Inject(MAT_DIALOG_DATA) public data: Exercise

  ) { }

  getHeading(): string {
    return this.editing ? "Übung bearbeiten" : "Übung hinzufügen";
  }


  fileEmitted($event: File) {
    this.fileToUpload = $event
  }
  
  toggleMuscleGroups() {
    this.exerciseInformationVisible = !this.exerciseInformationVisible
  }

  ngOnInit(): void {

    this.userInfoService.getUserinfo().subscribe(res => {
      if (res && res.providers) this.canUploadFiles = res.providers?.split(" ").includes("google")
    })

    this.initForm();

    if (this.editing) {
      this.setFormValues(this.data)
    }

  }

  private setFormValues(exercise: Exercise) {
    this.exerciseForm.patchValue(exercise);

    this.exerciseForm.setControl(
      "muscleGroups",
      this.buildMuscleGroupsArray(exercise.muscleGroups)
    );
  }

  get name() { return this.exerciseForm.get('name'); }

  get description() { return this.exerciseForm.get('description'); }

  private initForm() {
    if (this.exerciseForm) {
      return;
    }

    this.exerciseForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18)]),
      description: new FormControl("", [
        Validators.maxLength(100)]),
      pictureUrl: [""],
      exerciseType: [""],
      muscleGroups: this.buildMuscleGroupsArray([""]),
    });
  }

  private buildMuscleGroupsArray(values: string[]): FormArray {
    return this.formBuilder.array(values);
  }

  get muscleGroups(): FormArray {
    return this.exerciseForm.get("muscleGroups") as FormArray;
  }

  addMuscleGroup() {
    this.muscleGroups.push(new FormControl(""));
  }

  removeMuscleGroup(index: number) {
    this.muscleGroups.removeAt(index);
  }

  submitForm() {
    const formValue = this.exerciseForm.value;

    var exerciseType;
    var muscleGroups;
    var unitId;
    var exerciseId;
    var date;
    var fileId;

    if (this.editing) {
      if (this.data.fileId) {
        fileId = this.data.fileId.split("?jwt=")[0]
      }
      exerciseId = this.data.id;
      date = this.data.date;
      unitId = this.data.unitId
    }

    if (formValue.exerciseType === "") {
      exerciseType = null;
    } else {
      exerciseType = formValue.exerciseType;
    }

    if (formValue.muscleGroups[0] === "") {
      muscleGroups = [];
    } else {
      muscleGroups = formValue.muscleGroups;
    }

    muscleGroups = muscleGroups.filter((muscleGroup) => muscleGroup !== "");

    if (this.fileToUpload) {
      this.isLoading = true;
      this.uploadService.postFile(this.fileToUpload)
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

              const newExercise: Exercise = {
                id: exerciseId,
                unitId: unitId,
                date: date,
                name: formValue.name,
                exerciseType: exerciseType,
                description: formValue.description,
                muscleGroups: muscleGroups,
                fileId: event.body.id,
              };
              this.isLoading = false;

              this.submitExercise.emit(newExercise);
              this.exerciseForm.reset;
          }
        })
    } else {
      const newExercise: Exercise = {
        id: exerciseId,
        unitId: unitId,
        date: date,
        name: formValue.name,
        exerciseType: exerciseType,
        description: formValue.description,
        muscleGroups: muscleGroups,
        fileId: fileId,
      };
      this.isLoading = false;
      this.submitExercise.emit(newExercise);
      this.exerciseForm.reset;
    }
  }
}


