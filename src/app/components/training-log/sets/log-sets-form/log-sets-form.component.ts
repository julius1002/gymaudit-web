import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Set, MeasureUnit } from "src/app/model/set";
import { LogSetServiceService } from 'src/app/services/log-set-service.service';

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
    private setListService: LogSetServiceService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.editing && this.set) {
      this.setFormValues(this.set);
    }
  }

  private setFormValues(set: Set) {
    this.setForm.patchValue(set);

  }

  private initForm() {
    if (this.setForm) {
      return;
    }

    this.setForm = this.formBuilder.group({
      reps: ["", Validators.required],
      load: ["", Validators.required],
      measureUnit: [""],
    });
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
    if (this.editing) {
      exerciseId = this.set.exerciseId;
      setId = this.set.id;
    }
    var set: Set = {
      id: setId,
      reps: formValue.reps,
      load: formValue.load,
      measureUnit: measureUnit,
      date: this.set?.date || Date.now(),
      exerciseId: exerciseId
    };
    this.submitSet.emit(set);
    this.setListService.updateSetList(set)
    this.setForm.reset;
  }
}
