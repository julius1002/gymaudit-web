import {
  Component,
  OnInit,
  Input, ViewChild} from "@angular/core";
import { Set, MeasureUnit } from "src/app/model/set";
import { Observable, BehaviorSubject } from "rxjs";
import { Page } from "src/app/model/page";
import { Exercise } from "src/app/model/exercise";
import { SetService } from "src/app/services/set.service";
import { PageEvent } from "@angular/material/paginator";
import { switchMap } from "rxjs/operators";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddSetComponent } from "../../add-set/add-set.component";
import { EditSetComponent } from "../../edit-set/edit-set.component";
import { LogSetServiceService } from "src/app/services/log-set-service.service";
import {MatTable} from '@angular/material/table';

@Component({
  selector: "app-set-table",
  templateUrl: "./set-table.component.html",
  styleUrls: ["./set-table.component.scss"],
})
export class SetTableComponent implements OnInit {
  @Input() exerciseSubject: BehaviorSubject<Exercise>;
  @Input() editing = false;

  @ViewChild(MatTable) table: MatTable<any>;

  addSetDialog: MatDialogRef<AddSetComponent, any>;
  editSetDialog: MatDialogRef<EditSetComponent, any>;

  setsPage$: Observable<Page<Set>>;
  measureUnitEnum = MeasureUnit;
  index = 0;
  pageSize = 4;
  displayedColumns: String[];
  exercise: Exercise;

  todaysDate:Date;

  constructor(
    private setService: SetService,
    public dialog: MatDialog,
    private setListService: LogSetServiceService
  ) {}

  ngOnInit(): void {
    this.todaysDate = new Date();

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

      this.setListService.setList.subscribe((set) => {
        this.updateSets();
        if (this.addSetDialog) {
          this.addSetDialog.close();
        }
        if (this.editSetDialog) {
          this.editSetDialog.close();
        }
      });
    } else {
      this.displayedColumns = ["reps", "number", "measureUnit", "date"];
    }
  }

  public updateSets() {
    if(this.editing){
    this.setsPage$ = this.exerciseSubject.pipe(
      switchMap((exercise) =>
        this.setService.getTodaysSetsByPage(
          exercise.unitId,
          exercise.id,
          this.pageSize,
          this.index
        )
      )
    );
  }else{
    this.setsPage$ = this.exerciseSubject.pipe(
      switchMap((exercise) =>
        this.setService.getByPage(
          exercise.unitId,
          exercise.id,
          this.pageSize,
          this.index
        )
      )
    );
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
    if(this.editing){
      this.setsPage$ = this.exerciseSubject.pipe(
        switchMap((exercise) =>
          this.setService.getTodaysSetsByPage(
            exercise.unitId,
            exercise.id,
            this.pageSize,
            this.index
          )
        )
      );
    }else{
      this.setsPage$ = this.exerciseSubject.pipe(
        switchMap((exercise) =>
          this.setService.getByPage(
            exercise.unitId,
            exercise.id,
            this.pageSize,
            this.index
          )
        )
      );
    }
  }

  public addSet() {
    this.addSetDialog = this.dialog.open(AddSetComponent, {
      width: "400px",
      height: "400px",
      data: { exercise: this.exercise },
    });
  }

  public editSet(set: Set) {
    this.editSetDialog = this.dialog.open(EditSetComponent, {
      width: "400px",
      height: "400px",
      data: { set: set, exercise: this.exercise },
    });
  }
}
