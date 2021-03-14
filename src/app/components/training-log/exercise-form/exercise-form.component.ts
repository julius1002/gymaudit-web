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

  exerciseInformationVisible:boolean = true;
  keys = Object.keys;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private exerciseListService: ExercisesListService
  ) {}

  getHeading(): string {
    return this.editing ? "Übung bearbeiten" : "Übung hinzufügen";
  }


  toggleMuscleGroups(){
    this.exerciseInformationVisible = !this.exerciseInformationVisible
  }

  ngOnInit(): void {

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

    const newExercise: Exercise = {
      id: exerciseId,
      unitId: unitId,
      date: date,
      name: formValue.name,
      exerciseType: exerciseType,
      description: formValue.description,
      muscleGroups: muscleGroups,
      pictureUrl: formValue.pictureUrl,
    };

    this.submitExercise.emit(newExercise);
    this.exerciseForm.reset;

    if (this.editing) { 
      
    } else {
      this.snackBar.open(
        `${newExercise.name} erfolgreich bearbeitet!`,
        "schließen",
        {
          duration: 2500,
        }
      );

      
    }
  }
}
