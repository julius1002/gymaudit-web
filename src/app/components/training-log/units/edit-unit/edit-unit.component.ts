import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Unit } from 'src/app/model/unit';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {



  constructor(private dialogRefEdit: MatDialogRef<EditUnitComponent>, private unitService: UnitService, private alertService:AlertService
  ) { }

  ngOnInit(): void {
  }

  putUnit(unit: Unit) {
    this.unitService.update(unit).pipe(take(1))
      .subscribe((putUnit) => {
        this.dialogRefEdit.close(putUnit);
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
