import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/model/unit';
import { Exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

  traineeId:string = "1337"; //TODO current authenticated traineeId has to be retrieved

  units$:Observable<Unit>;
  exercises$:Observable<Exercise[]>;

  dropDownTitle:string = "Einheit wählen";

  selectedExercise:Exercise;

  constructor(private unitService:UnitService,
    private exerciseService:ExerciseService) { }

  ngOnInit(): void {
    this.getUnitsFromTrainee();
  }

  public getUnitsFromTrainee(){
    this.units$ = this.unitService.getUnitsOfTrainee(this.traineeId);
  }

  public getExercisesFromUnit(unit:Unit):void{
    this.dropDownTitle = unit.name;
    this.exercises$ = this.exerciseService.getExercisesOfUnitOfTrainee(this.traineeId, unit.id);
  }

  public selectExercise(exercise:Exercise){
    this.selectedExercise = exercise;
  }
}
