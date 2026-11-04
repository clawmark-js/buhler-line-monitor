import { Component, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

const TICK_MS = 1000;

/** Live date and time. The interval is unsubscribed automatically when the component is destroyed. */
@Component({
  selector: 'app-clock',
  imports: [DatePipe],
  template: `<time [attr.datetime]="isoNow()">{{ now() | date: 'dd.MM.yyyy HH:mm' }}</time>`,
})
export class Clock {
  protected readonly now = toSignal(interval(TICK_MS).pipe(map(() => new Date())), {
    initialValue: new Date(),
  });

  protected readonly isoNow = computed(() => this.now().toISOString());
}
