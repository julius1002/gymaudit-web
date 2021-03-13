import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/model/unit';
import { Page } from 'src/app/model/page';
import { Exercise } from 'src/app/model/exercise';
import { UnitService } from 'src/app/services/unit.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-unit-list',
  templateUrl: './log-unit-list.component.html',
  styleUrls: ['./log-unit-list.component.scss']
})
export class LogUnitListComponent implements OnInit {
  units: Unit[];
  exercises$: Observable<Page<Exercise>>;
  selectedUnit: Unit;
  selectedExercise: Exercise;
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
      document.getElementById("bottom-nav").classList.add("show-nav")
    }
  }
  ngOnInit(): void {

    this.unitService.getAll()
      .subscribe(unitsRes => {
        this.units = unitsRes;
        setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
      , 500)
      });

  }



  routeToExercise($event, unit: Unit) {
    this.router.navigate([unit.id], { relativeTo: this.route, state: { data: unit } })

  }

  public turn(currentPage: Page<Unit>, value: number) {
  }


}
