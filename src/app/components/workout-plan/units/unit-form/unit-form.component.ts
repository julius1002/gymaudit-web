import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { Unit } from "src/app/model/unit";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UnitService } from "src/app/services/unit.service";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { UnitListService } from "src/app/services/unit-list.service";

@Component({
  selector: "app-unit-form",
  templateUrl: "./unit-form.component.html",
  styleUrls: ["./unit-form.component.scss"],
})
export class UnitFormComponent implements OnInit {
  @Input() editing = false;
  @Output() submitUnit = new EventEmitter<Unit>();
  unit: Unit;
  unitForm: FormGroup;
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

    if (this.editing) {
      this.route.paramMap
        .pipe(map(() => window.history.state))
        .subscribe((unit) => {
          this.setFormValues(unit), (this.unit = unit);
        });
    }
  }

  private setFormValues(unit: Unit) {
    this.unitForm.patchValue(unit);
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

  removeUnit() {
    if (confirm("Einheit wirklich löschen?")) {
      this.unitService.delete(this.unit.id).subscribe((unit) => {
        this.router.navigate([".."]), this.unitListService.updateListEvent(),
        this.snackBar.open(
          `${unit.name} erfolgreich gelöscht!`,
          "schließen",
          {
            duration: 2500,
          }
        );
      });
    }
  }

  submitForm() {
    const formValue = this.unitForm.value;

    var id;
    var date;

    if (this.editing) {
      id = this.unit.id;
      date = this.unit.date;
    }

    const newUnit: Unit = {
      id: id,
      date: date,
      name: formValue.name,
      description: formValue.description,
    };

    this.submitUnit.emit(newUnit);
    this.unitForm.reset;

    if (this.editing) {
      this.snackBar.open(
        `${newUnit.name} erfolgreich bearbeitet!`,
        "schließen",
        {
          duration: 2500,
        }
      );
    } else {
      this.snackBar.open(
        `${newUnit.name} erfolgreich hinzugefügt!`,
        "schließen",
        {
          duration: 2500,
        }
      );
    }
  }
}
