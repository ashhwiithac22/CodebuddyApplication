import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject = new Subject<number>();
  private currentTime = 0;
  private isRunning = false;

  getTimer(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  startTimer(initialTime: number) {
    this.currentTime = initialTime;
    this.isRunning = true;
    
    interval(1000)
      .pipe(
        takeWhile(() => this.isRunning && this.currentTime > 0),
        map(() => --this.currentTime)
      )
      .subscribe(time => {
        this.timerSubject.next(time);
        if (time <= 0) {
          this.stopTimer();
        }
      });
  }

  stopTimer() {
    this.isRunning = false;
  }

  getFormattedTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}