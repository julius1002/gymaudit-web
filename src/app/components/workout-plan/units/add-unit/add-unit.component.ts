import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/model/unit';
import { Router } from '@angular/router';
import { UnitService } from 'src/app/services/unit.service';
import { UnitListService } from 'src/app/services/unit-list.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {

  constructor(
    private unitService: UnitService,
    private unitListService: UnitListService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  postUnit(unit: Unit) {
    this.unitService.postSingle(unit).subscribe((unit) => {
      this.router.navigateByUrl(
        `units/(exercises:${unit.id})`
      ), this.unitListService.updateListEvent()
    });
  }
}
