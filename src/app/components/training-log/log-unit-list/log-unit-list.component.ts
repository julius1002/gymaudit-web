import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/model/unit';
import { Page } from 'src/app/model/page';
import { Exercise } from 'src/app/model/exercise';
import { UnitService } from 'src/app/services/unit.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-log-unit-list',
  templateUrl: './log-unit-list.component.html',
  styleUrls: ['./log-unit-list.component.scss']
})
export class LogUnitListComponent implements OnInit {
  unitsPage: Page<Unit>;
  selectedUnit: Unit;
  selectedExercise: Exercise;
  index: number = 0;
  pageSize: number = 5;
  constructor(
    private unitService: UnitService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      if(!this.unitsPage.last){
        this.unitService.getByPage(this.pageSize, this.index+=1, "").subscribe((res:Page<Unit>) =>{
        this.unitsPage.content = this.unitsPage.content.concat(res.content)
        this.unitsPage.last = res.last
      })
      }
    }
  }
  ngOnInit(): void {

    this.getUnitsPage(this.pageSize, this.index)

  }

  public turn(currentPage: Page<Unit>, value: number) {
    this.index += value
    this.getUnitsPage(currentPage.size, this.index)
  }

  private getUnitsPage(size: number, page: number): void {
     this.unitService.getByPage(size, page, "").pipe(
       take(1)
     )
    .subscribe(res => {
      this.unitsPage = res;
      if (res.content.length < 7) {
        setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
          , 500)
      }
    });
  }

  public openDialog(){

  }




  routeToExercise($event, unit: Unit) {
    this.router.navigate([unit.id], { relativeTo: this.route, state: { data: unit } })

  }

}
