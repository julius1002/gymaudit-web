import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Exercise, ExerciseType, MuscleGroup } from "src/app/model/exercise";
import { Observable } from "rxjs";

import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { ExerciseService } from "src/app/services/exercise.service";
import { environment } from "src/environments/environment";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ExercisesListService } from "src/app/services/exercises-list.service";
import { MatDialogRef } from "@angular/material/dialog";
import { AddExerciseComponent } from "../add-exercise/add-exercise.component";
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
  exercise: Exercise;
  exerciseForm: FormGroup;

  exerciseTypeEnum = ExerciseType;
  muscleGroupEnum = MuscleGroup;

  exerciseInformationVisible: boolean = true;


  unitId: string;

  fileToUpload: File = null;

  isLoading: boolean = false;
  progress: number;
  mode: ProgressSpinnerMode = 'determinate';

  keys = Object.keys;

  canUploadFiles: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private userInfoService: UserInfoService

  ) { }

  getHeading(): string {
    return this.editing ? "Übung bearbeiten" : "Übung hinzufügen";
  }


  toggleMuscleGroups() {
    this.exerciseInformationVisible = !this.exerciseInformationVisible
  }

  ngOnInit(): void {

    this.userInfoService.getUserinfo().subscribe(res => {

      if(res && res.providers) this.canUploadFiles = res.providers?.split(" ").includes("google")
    })

    this.initForm();

    if (this.editing) {
      this.route.paramMap
        .pipe(map(() => window.history.state))
        .subscribe((exercise) => {
          this.setFormValues(exercise), (this.exercise = exercise);
        });
    }

  }

  private setFormValues(exercise: Exercise) {
    this.exerciseForm.patchValue(exercise);

    this.exerciseForm.setControl(
      "muscleGroups",
      this.buildMuscleGroupsArray(exercise.muscleGroups)
    );
  }

  private initForm() {
    if (this.exerciseForm) {
      return;
    }

    this.exerciseForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: [""],
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

  /* removeExercise() {
     this.exerciseForm.reset;
     if (confirm("Übung wirklich löschen?")) {
       this.unitId$
         .pipe(
           switchMap((unitId) =>
             this.exerciseService.delete(unitId, this.exercise.id)
           )
         )
         .subscribe((exercise) => {
           this.exerciseListService.updateListEvent(exercise),
             this.router
               .navigate(["."])
               .then(() =>
                 this.router.navigateByUrl(
                   `units/(exercises:${exercise.unitId})`
                 )
               ),
             this.snackBar.open(
               `${exercise.name} erfolgreich gelöscht!`,
               "schließen",
               {
                 duration: 2500,
               }
             );
         });
     }
   }*/

  submitForm() {
    const formValue = this.exerciseForm.value;

    var exerciseType;
    var muscleGroups;
    var unitId;
    var exerciseId;
    var date;

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

    if (this.editing) {
      //this.unitId$.subscribe((unitIdd) => (unitId = unitIdd));
      exerciseId = this.exercise.id;
      date = this.exercise.date;
    }



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
        fileId: null,
      };
      this.isLoading = false;
      this.submitExercise.emit(newExercise);
      this.exerciseForm.reset;

    }
    this.removeFile();







  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }

  public removeFile() {
    this.fileToUpload = undefined;
  }
}
