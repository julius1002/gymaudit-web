import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Unit } from "src/app/model/unit";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UnitService } from "src/app/services/unit.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UnitListService } from "src/app/services/unit-list.service";
import { Set, MeasureUnit } from "src/app/model/set";

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
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private unitListService: UnitListService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.editing && this.set) {
      this.setFormValues(this.set);
    }
  }

  private setFormValues(set: Set) {
    this.setForm.patchValue(set);

    this.setForm.setValue({
      reps: set.reps,
      number: set.number,
      measureUnit: set.measureUnit,
    });
  }

  private initForm() {
    if (this.setForm) {
      return;
    }

    this.setForm = this.formBuilder.group({
      reps: ["", Validators.required],
      number: [""],
      measureUnit: [""],
    });
  }

  removeSet() {
    console.log("remove Set" + this.set);
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
      exerciseId = this.set.exerciseId;
      setId = this.set.id;
      date = this.set.date;
      calculatedVolume = this.set.calculatedVolume;
    }
    var set: Set = {
      id: setId,
      reps: formValue.reps,
      number: formValue.number,
      measureUnit: measureUnit,
      calculatedVolume: calculatedVolume,
      date: date,
      exerciseId: exerciseId,
    };
    this.submitSet.emit(set);
    this.setForm.reset;
  }
}
