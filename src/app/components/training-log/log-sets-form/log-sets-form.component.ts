import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Set, MeasureUnit } from "src/app/model/set";
import { LogSetServiceService } from 'src/app/services/log-set-service.service';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: "app-log-sets-form",
  templateUrl: "./log-sets-form.component.html",
  styleUrls: ["./log-sets-form.component.scss"],
})
export class LogSetsFormComponent implements OnInit {
  @Input() editing = false;
  @Input() set: Set;
  @Output() submitSet = new EventEmitter<Set>();
  setForm: FormGroup;
  measureUnitEnum = MeasureUnit;
  keys = Object.keys;
  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private setListService:LogSetServiceService,
    private setService:SetService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.editing && this.set) {
      this.setFormValues(this.set);
    }
  }

  private setFormValues(set: Set) {
    this.setForm.patchValue(set);

   /* this.setForm.setValue({
      reps: set.reps,
      number: set.number,
      measureUnit: set.measureUnit,
    });*/
  }

  private initForm() {
    if (this.setForm) {
      return;
    }

    this.setForm = this.formBuilder.group({
      reps: ["", Validators.required],
      number: ["", Validators.required],
      measureUnit: [""],
    });
  }

  removeSet() {
    this.setService.deleteSet(this.set.id).subscribe(deletedSet =>
      this.setListService.updateSetList(this.set)
    )
  }

  submitForm() {
    const formValue = this.setForm.value;
    var measureUnit;
    if (formValue.measureUnit === "") {
      measureUnit = null;
    } else {
      measureUnit = formValue.measureUnit;
    }
    var exerciseId = null;
    var setId = null;
    var date = Date.now();
    var calculatedVolume = 0;
    if (this.editing) {
     // exerciseId = this.set.exerciseId;
      setId = this.set.id;
      date = this.set.date;
    }
    var set: Set = {
      id: setId,
      reps: formValue.reps,
      load: formValue.number,
      measureUnit: measureUnit,
      date: date,
      exerciseId: exerciseId
    };
    this.submitSet.emit(set);
    this.setListService.updateSetList(set)
    this.setForm.reset;
  }
}
