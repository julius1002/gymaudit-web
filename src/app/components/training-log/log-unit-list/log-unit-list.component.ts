import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/model/unit';
import { Page } from 'src/app/model/page';
import { Exercise } from 'src/app/model/exercise';
import { UnitService } from 'src/app/services/unit.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log-unit-list',
  templateUrl: './log-unit-list.component.html',
  styleUrls: ['./log-unit-list.component.scss']
})
export class LogUnitListComponent implements OnInit {
    units$: Observable<Unit[]>;
    exercises$: Observable<Page<Exercise>>;
    selectedUnit: Unit;
    selectedExercise: Exercise;
    constructor(
      private unitService: UnitService
    ) {}
  
    ngOnInit(): void {
      this.units$ = this.unitService.getAll(environment.TRAINEEID);
    }
}
