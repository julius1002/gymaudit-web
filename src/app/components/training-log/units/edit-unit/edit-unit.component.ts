import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, take } from 'rxjs/operators';
import { Unit } from 'src/app/model/unit';
import { UnitService } from 'src/app/services/unit.service';
import { AddExerciseComponent } from '../../exercises/add-exercise/add-exercise.component';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {



  constructor(private dialogRefEdit: MatDialogRef<EditUnitComponent>, private unitService: UnitService, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  putUnit(unit: Unit) {
    this.unitService.update(unit).pipe(take(1))
      .subscribe((putUnit) => {
        if (unit.fileId) {
          unit.fileId = putUnit.fileId + "?jwt=" + localStorage.getItem("jwt")
        }
        this.dialogRefEdit.close(unit);
      }, (err) => {
        this.dialogRefEdit.close(undefined);

      });
  }

  deleteUnit(unit: Unit) {
    if (confirm(`Einheit ${unit.name} wirklich löschen?`)) {
      this.unitService.delete(unit.id)
        .subscribe((deleteUnit) => {
          deleteUnit.id = undefined
          this.dialogRefEdit.close(deleteUnit);
        }, (err) => {
          this.dialogRefEdit.close(undefined);

        });
    }

  }


}
