import { Component, OnInit, Inject } from '@angular/core';
import { Unit } from 'src/app/model/unit';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-unit-dialog',
  templateUrl: './edit-unit-dialog.component.html',
  styleUrls: ['./edit-unit-dialog.component.scss']
})
export class EditUnitDialogComponent implements OnInit {

  unit:Unit;
  constructor(public dialogRef: MatDialogRef<EditUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.unit = data;
     }

  ngOnInit(): void {
  }

}
