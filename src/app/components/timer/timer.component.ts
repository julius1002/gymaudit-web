import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable, Subject } from 'rxjs';
import { map, switchMapTo, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit {

  @ViewChild('startBtn') private startBtn: ElementRef<HTMLElement>;

  @ViewChild('stopBtn') private stopBtn: ElementRef<HTMLElement>;

  private time: Subject<number> = new Subject()
  time$: Observable<number> = this.time.asObservable()

  constructor() { }
  ngAfterViewInit(): void {

    const start$ = fromEvent(this.startBtn.nativeElement, "click")
    const stop$ = fromEvent(this.stopBtn.nativeElement, "click")

    const time = interval(100);

    const everyTenth: (a: number) => (number)
      = (n: number) => n / 10

    start$.pipe(
      switchMapTo(
        time.pipe(
          map(everyTenth),
          takeUntil(stop$)
        )
      )
    ).subscribe(this.time)
  }

  ngOnInit(): void {

  }

}
