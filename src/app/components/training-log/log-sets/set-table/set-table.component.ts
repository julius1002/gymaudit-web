import { Component, OnInit, Input } from "@angular/core";
import { Set, MeasureUnit } from "src/app/model/set";
import { Observable, Subject } from "rxjs";
import { Page } from "src/app/model/page";
import { Exercise } from "src/app/model/exercise";
import { SetService } from "src/app/services/set.service";
import { PageEvent } from "@angular/material/paginator";
import { switchMap } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { AddSetComponent } from '../../add-set/add-set.component';
import { EditSetComponent } from '../../edit-set/edit-set.component';
@Component({
  selector: "app-set-table",
  templateUrl: "./set-table.component.html",
  styleUrls: ["./set-table.component.scss"],
})
export class SetTableComponent implements OnInit {
  @Input() exerciseSubject: Subject<Exercise>;
  @Input() editing = false;
  setsPage$: Observable<Page<Set>>;
  measureUnitEnum = MeasureUnit;
  index = 0;
  pageSize = 5;
  displayedColumns: String[];
  exercise: Exercise;

  constructor(private setService: SetService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.exerciseSubject.subscribe((exercise) => {
      (this.exercise = exercise),
        this.getExercisesPageFromUnit(this.pageSize, 0, exercise);
    });
    if (this.editing) {
      this.displayedColumns = [
        "reps",
        "number",
        "measureUnit",
        "date",
        "actions",
      ];
    } else {
      this.displayedColumns = ["reps", "number", "measureUnit", "date"];
    }
  }

  public turn(event: PageEvent) {
    this.getExercisesPageFromUnit(
      event.pageSize,
      event.pageIndex,
      this.exercise
    );
    this.index = event.pageIndex;
  }

  private getExercisesPageFromUnit(
    size: number,
    page: number,
    exercise: Exercise
  ): void {
    this.setsPage$ = this.setService.getByPage(
      exercise.unitId,
      exercise.id,
      size,
      page
    );
  }
  public addSet() {
    const dialogRef = this.dialog.open(AddSetComponent, {
      width: "400px",
      height: "400px",
      data: { exercise: this.exercise },
    });
  }

  public editSet(set:Set){
    const dialogRef = this.dialog.open(EditSetComponent, {
      width: "400px",
      height: "400px",
      data: { set:set, exercise:this.exercise },
    });
  }
}
