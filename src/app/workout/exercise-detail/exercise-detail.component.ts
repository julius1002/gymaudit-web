import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss']
})
export class ExerciseDetailComponent implements OnInit {

  @Input() exercise:Exercise;

  constructor() { }

  ngOnInit(): void {
  }
}
