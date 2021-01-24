import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {
  buffer, debounceTime, filter,
  map,
  mapTo,
  takeUntil
} from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  time = 0;
  count = false;
  stopwatch!: Observable<number>;
  stop$ = new Subject();
  reset$ = new Subject();
  wait$ = new Subject();
  destroy$ = new Subject();

  ngOnInit(): void {
    this.initTimer();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initTimer(): void {
    const interval$ = interval(1000).pipe(mapTo(1));

    const doubleClick$ = this.wait$.pipe(
      buffer(
        this.wait$.pipe(debounceTime(300))
      ),
      map(list => list.length),
      filter(x => x === 2)
    );

    this.stopwatch = interval$
      .pipe(
        takeUntil(this.stop$),
        takeUntil(this.reset$),
        takeUntil(doubleClick$),
        takeUntil(this.destroy$)
      );
  }

  start(): void {
    this.stopwatch.subscribe(val => this.time += val);
    this.count = true;
  }

  stop(): void {
    this.stop$.next();
    this.count = false;
    this.time = 0;
  }

  wait(): void {
    this.wait$.next();
    this.count = false;
  }

  reset(): void {
    this.reset$.next();
    this.time = 0;
    this.stopwatch.subscribe(val => this.time += val);
    this.count = true;
  }
}
