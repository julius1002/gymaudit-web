import { Component, OnInit, Input } from '@angular/core';
import { Set } from 'src/app/model/set'
@Component({
  selector: 'app-set-table',
  templateUrl: './set-table.component.html',
  styleUrls: ['./set-table.component.scss']
})
export class SetTableComponent implements OnInit {

  @Input() sets:Set[];
  constructor() { }

  ngOnInit(): void {
  }

}
