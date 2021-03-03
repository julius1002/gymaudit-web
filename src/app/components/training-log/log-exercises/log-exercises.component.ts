import { Component, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Page } from "src/app/model/page";
import { Exercise } from "src/app/model/exercise";
import { ActivatedRoute } from "@angular/router";
import { switchMap, share, take, map } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: "app-log-exercises",
  templateUrl: "./log-exercises.component.html",
  styleUrls: ["./log-exercises.component.scss"],
})
export class LogExercisesComponent implements OnInit {

  @ViewChild('appLogSets')
  logSetsElement: ElementRef;

  exercisesPage$: Observable<Page<Exercise>>;
  exerciseSubject: Subject<Exercise> 
  = new BehaviorSubject<Exercise>(undefined);
  unitId$: Observable<string>;

  index: number = 0;
  pageSize: number = 5;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.exercisesPage$ = this.route.paramMap.pipe(
      switchMap((paramMap) =>
        this.exerciseService.getByPage(paramMap.get("unitId")
        , this.pageSize, this.index)
      ),
      share()
    );

    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );
    
    let selectFirst = (exercises) => {
      if (exercises.content.length) {
        this.selectExercise(exercises.content[0]);
      } else {
        return null;
      }
    };

    this.exercisesPage$.subscribe(selectFirst);
  }

  selectExercise(exercise: Exercise) {
    this.exerciseSubject.next(exercise);
  }

  public turn(event: PageEvent) {
    this.getExercisesPageFromUnit(event.pageSize, event.pageIndex);
    this.index = event.pageIndex;
  }

  private getExercisesPageFromUnit(size: number, page: number): void {
    this.exercisesPage$ = this.unitId$.pipe(
      switchMap((unitId) => this.exerciseService.getByPage(unitId, size, page)),
      take(1),
      share()
    );
  }
}
