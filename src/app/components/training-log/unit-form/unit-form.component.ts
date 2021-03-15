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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private unitListService: UnitListService,
    private dialogRefAdd: MatDialogRef<AddUnitDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.editing) {
      this.setFormValues(this.data.unit);
    }
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

    const newUnit: Unit = {
      id: id,
      date: date,
      name: formValue.name,
      description: formValue.description,
      traineeId: traineeId,
    };

    this.submitUnit.emit(newUnit);
    this.unitForm.reset;

   
    
  }
}
