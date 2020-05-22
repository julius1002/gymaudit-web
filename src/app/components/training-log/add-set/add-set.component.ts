import { Component, OnInit, Input, Inject } from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Set } from 'src/app/model/set';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, map, publishReplay } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Exercise } from 'src/app/model/exercise';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.scss'],
})
export class AddSetComponent implements OnInit {
  exercise: Exercise;

  constructor(
    private setService: SetService,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data
  ) {this.exercise = data.exercise;
  
  }  

  ngOnInit(): void {}

  postSet(set: Set) {
    this.setService.postSet(this.exercise.unitId, this.exercise.id, set).subscribe(x => console.log(x));
  }
}
