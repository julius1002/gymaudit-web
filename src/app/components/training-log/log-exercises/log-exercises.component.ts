import { Component, HostListener, OnInit } from "@angular/core";
import { ExerciseService } from "src/app/services/exercise.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Page } from "src/app/model/page";
import { Exercise } from "src/app/model/exercise";
import { ActivatedRoute } from "@angular/router";
import { switchMap, share, take, map, tap, debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { ViewChild, ElementRef } from '@angular/core';
import { Unit } from "src/app/model/unit";
import { Content } from "@angular/compiler/src/render3/r3_ast";
@Component({
  selector: "app-log-exercises",
  templateUrl: "./log-exercises.component.html",
  styleUrls: ["./log-exercises.component.scss"],
})
export class LogExercisesComponent implements OnInit {


  selectedUnit: Unit;

  @ViewChild('appLogSets')
  logSetsElement: ElementRef;

  exercisesPage: Page<Exercise>;
  exerciseSubject: Subject<Exercise> = new BehaviorSubject<Exercise>(undefined);
  unitId$: Observable<string>;

  keyUp$ = new Subject<string>();

  index: number = 0;
  pageSize: number = 8;
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      var bottomnav = document.getElementById("bottom-nav");
      if (bottomnav) {
        bottomnav.classList.add("show-nav")
      }
    }
  }
  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.keyUp$.pipe(
      filter(filter => filter.length >= 3||filter.length==0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(filter => {
        return this.unitId$.pipe(
          switchMap((unitId) => this.exerciseService.getByPage(unitId, this.pageSize, 0, filter)),
          take(1),
          
          tap((res) => {
            if (res.content.length < 7) {
              var bottomNav = document.getElementById("bottom-nav");
              setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
                , 500)
            }
          })
        );
      }),
    ).subscribe(res => this.exercisesPage = res)


    this.selectedUnit = <Unit>history.state.data

    this.route.paramMap.pipe(
      switchMap((paramMap) =>
        this.exerciseService.getByPage(paramMap.get("unitId")
          , this.pageSize, this.index)
      ),
      share()
    ).subscribe(res => this.exercisesPage = res);

    this.unitId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("unitId"))
    );



  }



  selectExercise(exercise: Exercise) {

    //routing

  }


  toggleSearchBar() {
    var searchButton = document.getElementsByClassName("search-button").item(0);
    var closeButton = document.getElementsByClassName("close-button").item(0);
    var searchBar = <HTMLInputElement>document.getElementById("search-bar");
    var unitTitle = document.getElementById("unit-title");

    if (!searchButton.classList.contains("invisible")) {
      searchBar.focus();
    }else{
        searchBar.value =""
      this.keyUp$.next("")
    }
    searchBar.classList.toggle("invisible")
    unitTitle.classList.toggle("invisible")
    searchButton.classList.toggle("invisible")
    closeButton.classList.toggle("visible")

  }

  /*  keyUpSearch($event: KeyboardEvent) {
      const filter = (<HTMLInputElement>$event.target).value;
  
      this.exercisesPage$ = this.unitId$.pipe(
        switchMap((unitId) => this.exerciseService.getByPage(unitId, this.pageSize, 0, filter)),
        take(1),
        tap((res) => {
          if (res.content.length < 7) {
            var bottomNav = document.getElementById("bottom-nav");
            setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
              , 500)
          }
        })
      );
    }*/

  public turn(currentPage: Page<Exercise>, value: number) {
    this.index += value
    this.getExercisesPageFromUnit(currentPage.size, this.index);
  }

  private getExercisesPageFromUnit(size: number, page: number): void {
    this.unitId$.pipe(
      switchMap((unitId) => this.exerciseService.getByPage(unitId, size, page)),
      take(1),
      tap((res) => {
        if (res.content.length < 7) {
          setTimeout(() => document.getElementById("bottom-nav").classList.add("show-nav")
            , 500)
        }
      })
    ).subscribe(res => this.exercisesPage = res);
  }
}
