import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { SetService } from "src/app/services/set.service";
import { Observable } from "rxjs";
import { Set } from "src/app/model/set";
import { environment } from "src/environments/environment";
import { Unit } from "src/app/model/unit";
import { Exercise } from "src/app/model/exercise";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
@Component({
  selector: "app-set-list",
  templateUrl: "./set-list.component.html",
  styleUrls: ["./set-list.component.scss"],
})
export class SetListComponent implements OnInit {
  sets$: Observable<Set[]>;
  @Input() exercise: Exercise;
  unitId$: Observable<string>;
  constructor(private setService: SetService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("id"))
    );

    this.getSets();
  }
  ngOnChanges(): void {
    this.getSets();
  }
  getSets() {
    if (this.unitId$) {
      this.unitId$.subscribe(
        (id) =>
          (this.sets$ = this.setService.getSetsOfExerciseOfUnitOfTrainee(
            environment.TRAINEEID,
            id,
            this.exercise.id
          ))
      );
    }
  }
}
