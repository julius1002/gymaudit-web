import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/model/unit';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-training-log',
  templateUrl: './training-log.component.html',
  styleUrls: ['./training-log.component.scss']
})
export class TrainingLogComponent implements OnInit {

  units$:Observable<Unit[]>;
  constructor(private unitService:UnitService) { }

  ngOnInit(): void {
    this.units$ = this.unitService.getAll(environment.TRAINEEID);
  }

}
