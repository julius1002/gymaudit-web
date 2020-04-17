import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  unitId$:Observable<string>;
  constructor(private route: ActivatedRoute, private exerciseService:ExerciseService, private router:Router) {}

  ngOnInit(): void {
    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("id"))
    );
  }


  removeExercise(){
    if (confirm('Buch wirklich löschen?')) {
      this.unitId$
    .pipe(
      switchMap((unitId) =>
        this.exerciseService.deleteExercise(
          environment.TRAINEEID,
          unitId,
          "0"
         // this.exercise.id
        )
      )
    )
    .subscribe(res => this.router.navigate(['.', {outlets: {exercises: res.unitId}}], { relativeTo: this.route.parent })
   //.subscribe(res => this.router.navigate([{ outlets: { exercises: res.unitId }}], {relativeTo: this.route.parent})

    );

    }
}


}
