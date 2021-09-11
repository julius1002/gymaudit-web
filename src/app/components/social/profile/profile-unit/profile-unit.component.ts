import { Component, Input, OnInit } from '@angular/core';
import { ExerciseType } from 'src/app/model/exercise';

@Component({
  selector: 'app-profile-unit',
  templateUrl: './profile-unit.component.html',
  styleUrls: ['./profile-unit.component.scss']
})
export class ProfileUnitComponent implements OnInit {

  @Input()
  unit: any;
  panelOpenState = false;

  exercises
  isLoading: boolean;

  exerciseTypeEnum = ExerciseType;
  constructor() { }

  ngOnInit(): void {
  }

  opened() {
    if (!this.exercises) {
      this.isLoading = true;
      var uri = this.unit.links.filter(link => link.rel === "exercises")[0].href
      fetch(uri, { headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") } })
        .then(res => res.json())
        .then(result => { this.exercises = result; this.isLoading = false })
    }
  }
  closed() {
    this.isLoading = false;
  }

  //TODO eventhandling
}
