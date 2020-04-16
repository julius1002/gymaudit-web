import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Observable } from 'rxjs';
import { Set } from "src/app/model/set";
import { environment } from 'src/environments/environment';
import { Unit } from 'src/app/model/unit';
import { Exercise } from 'src/app/model/exercise';
@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent implements OnInit {

  sets$:Observable<Set[]>;
  @Input() unit:Unit;
  @Input () exercise:Exercise;

  constructor(private setService:SetService) { }

  ngOnInit(): void {
    this.getSets();
  }

  ngOnChanges(change:SimpleChanges): void {
    this.getSets();
  }

  getSets(){
    this.sets$ = this.setService.getSetsOfExerciseOfUnitOfTrainee(environment.TRAINEEID, this.unit.id, this.exercise.id);
  }

}
