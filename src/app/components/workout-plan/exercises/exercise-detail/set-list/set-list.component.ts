import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Exercise } from "src/app/model/exercise";
import { SetService } from "src/app/services/set.service";
import { Page } from "src/app/model/page";
import { Set } from "src/app/model/set";
import { Observable } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { switchMap, take, share } from "rxjs/operators";
@Component({
  selector: "app-set-list",
  templateUrl: "./set-list.component.html",
  styleUrls: ["./set-list.component.scss"],
})
export class SetListComponent implements OnInit {
  @Input() exercise: Exercise;
  setsPage$: Observable<Page<Set>>;

  index: number = 0;
  pageSize: number = 5;
  constructor(private setService: SetService) {}

  ngOnInit(): void {
    this.getExercisesPageFromUnit(this.pageSize, 0);
  }

  public turn(event: PageEvent) {
    this.getExercisesPageFromUnit(event.pageSize, event.pageIndex);
    this.index = event.pageIndex;
  }

  private getExercisesPageFromUnit(size: number, page: number): void {
    this.setsPage$ = this.setService.getByPage(
      this.exercise.unitId,
      this.exercise.id,
      size,
      page
    );
  }
}
