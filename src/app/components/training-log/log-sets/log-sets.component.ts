import { Component, OnInit, Input } from "@angular/core";
import { Exercise } from "src/app/model/exercise";
import { SetService } from "src/app/services/set.service";
import { Page } from "src/app/model/page";
import { Set, MeasureUnit } from "src/app/model/set";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-log-sets",
  templateUrl: "./log-sets.component.html",
  styleUrls: ["./log-sets.component.scss"],
})
export class LogSetsComponent implements OnInit {
  @Input() exerciseSubject: BehaviorSubject<Exercise> 
  = new BehaviorSubject<Exercise>(undefined);
  sets$: Observable<Page<Set>>;
  exercise: Exercise;
  measureUnitEnum = MeasureUnit;
  constructor(private setService: SetService) {}

  ngOnInit(): void {
    this.sets$ = this.exerciseSubject.pipe(
      switchMap((exercise) =>
        this.setService.getAll(exercise.unitId, exercise.id)
      )
    )

    this.exerciseSubject.subscribe((exercise) => 
      this.exercise = exercise
    );
  }

 

  
}
