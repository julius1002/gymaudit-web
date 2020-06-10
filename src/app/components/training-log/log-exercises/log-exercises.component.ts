import { Component, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Observable, Subject } from "rxjs";
import { Page } from "src/app/model/page";
import { Exercise } from "src/app/model/exercise";
import { ActivatedRoute } from "@angular/router";
import { switchMap, share } from "rxjs/operators";


@Component({
  selector: "app-log-exercises",
  templateUrl: "./log-exercises.component.html",
  styleUrls: ["./log-exercises.component.scss"],
})
export class LogExercisesComponent implements OnInit {
  exercises$: Observable<Page<Exercise>>;
  exerciseSubject:Subject<Exercise> = new Subject<Exercise>();
  constructor(
    private exerciseService: ExerciseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramMap) =>
        this.exerciseService.getAll(paramMap.get("unitId"))
      ),
      share()
    );

    let selectFirst = exercises => {if(exercises.content.length){
     this.selectExercise(exercises.content[0])
    }else{
      return null;
    }}

    this.exercises$.subscribe(selectFirst);
  }

  selectExercise(exercise: Exercise) {
    this.exerciseSubject.next(exercise);
  }

}
