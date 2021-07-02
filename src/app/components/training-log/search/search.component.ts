import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyUp$ = new Subject<string>();

  @Input()
  placeHolder: string;

  @Input()
  unitId$: Observable<any>

  @Input()
  service: any

  @Input()
  pageSize: number

  @Output()
  resultPage = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.keyUp$.pipe(
      filter(filter => filter.length >= 3 || filter.length == 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(filter => {
        if (this.unitId$) {
          return this.unitId$.pipe(
            switchMap((unitId) => this.service.fetchByPage(unitId, this.pageSize, 0, filter)),
            take(1),
            tap((res: any) => {
              if (res.content.length < 7) {
                var bottomNav = document.getElementById("bottom-nav");
                setTimeout(() => bottomNav.classList.add("show-nav")
                  , 500)
              }
            })
          );
        } else {
          return this.service.fetchByPage(this.pageSize, 0, filter)
        }
      }),
    ).subscribe(res => this.resultPage.emit(res))
  }

  toggleSearchBar() {
    var searchButton = document.getElementsByClassName("search-button").item(0);
    var closeButton = document.getElementsByClassName("close-button").item(0);
    var searchBar = <HTMLInputElement>document.getElementById("search-bar");
    var placeHolder = document.getElementById("placeHolder");

    if (!searchButton.classList.contains("invisible")) {
      searchBar.focus();
    } else {
      searchBar.value = ""
      this.keyUp$.next("")
    }
    searchBar.classList.toggle("invisible")
    searchButton.classList.toggle("invisible")
    closeButton.classList.toggle("visible")
    placeHolder.classList.toggle("invisible")
  }
}
