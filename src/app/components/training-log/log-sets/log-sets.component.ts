import { Component, OnInit, Input } from "@angular/core";
import { Exercise } from "src/app/model/exercise";
import { SetService } from "src/app/services/set.service";
import { Page } from "src/app/model/page";
import { Set, MeasureUnit } from "src/app/model/set";
import { Observable, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
@Component({
  selector: "app-log-sets",
  templateUrl: "./log-sets.component.html",
  styleUrls: ["./log-sets.component.scss"],
})
export class LogSetsComponent implements OnInit {
  @Input() exerciseSubject: Subject<Exercise> = new Subject<Exercise>();
  sets$: Observable<Page<Set>>;
  showAdd = false;
  exercise:Exercise;
  measureUnitEnum = MeasureUnit;
  
  constructor(private setService: SetService) {}

  ngOnInit(): void {
    this.sets$ = this.exerciseSubject.pipe(
      switchMap((exercise) =>
        this.setService.getAll(exercise.unitId, exercise.id)
      )
    );
    this.exerciseSubject.subscribe(x=>this.exercise=x);
  }

  showAddSets(){
    this.showAdd = true;
  }
}
