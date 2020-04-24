import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Router } from '@angular/router';
import { Unit } from 'src/app/model/unit';
import { UnitListService } from 'src/app/services/unit-list.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {

  constructor(
    private unitService: UnitService,
    private unitListService: UnitListService,
    private router: Router
  )  { }

  ngOnInit(): void {
  }

  putUnit(unit: Unit) {
    this.unitService.update(unit).subscribe((unit) => {
      this.router.navigateByUrl(
        `units/(exercises:${unit.id})`
      )
    , this.unitListService.updateListEvent(unit)
  })}
}
