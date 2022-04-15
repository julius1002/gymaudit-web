import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showElements$ = new BehaviorSubject(0);
  constructor() { }

  ngOnInit(): void {
    fromEvent(window, "mousewheel")
      .pipe(
        map((event: any) => event.deltaY >= 0),
        throttleTime(500),
        scan((acc: any, curr: any) => {
          return acc + (curr ? 1 : 0)
        }, 0)
      )
      .subscribe(this.showElements$)
    this.showElements$.subscribe(console.log)
  }

}
