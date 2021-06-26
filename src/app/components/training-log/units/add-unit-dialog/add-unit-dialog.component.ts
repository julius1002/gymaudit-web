import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, shareReplay, take, throttleTime } from 'rxjs/operators';
import { Unit } from 'src/app/model/unit';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-add-unit-dialog',
  templateUrl: './add-unit-dialog.component.html',
  styleUrls: ['./add-unit-dialog.component.scss']
})
export class AddUnitDialogComponent implements OnInit {

  constructor(private dialogRefAdd: MatDialogRef<AddUnitDialogComponent>, private unitService: UnitService,
  ) { }

  ngOnInit(): void {
  }
  postUnit(unit: Unit) {
    this.unitService.postSingle(unit).subscribe((unit) => {
      this.dialogRefAdd.close(unit);
    }, (err) => {
      this.dialogRefAdd.close(undefined);
    });

  }
}
