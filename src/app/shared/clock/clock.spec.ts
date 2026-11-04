import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Clock } from './clock';

describe('Clock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 4, 1, 12, 44, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function text(fixture: ComponentFixture<Clock>): string {
    return (fixture.nativeElement as HTMLElement).textContent?.trim() ?? '';
  }

  it('shows the current date and time as dd.MM.yyyy HH:mm', () => {
    const fixture = TestBed.createComponent(Clock);
    fixture.detectChanges();
    expect(text(fixture)).toBe('01.05.2020 12:44');
  });

  it('updates when the minute changes', () => {
    const fixture = TestBed.createComponent(Clock);
    fixture.detectChanges();

    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();

    expect(text(fixture)).toBe('01.05.2020 12:45');
  });

  it('exposes a machine-readable datetime', () => {
    const fixture = TestBed.createComponent(Clock);
    fixture.detectChanges();
    const time = (fixture.nativeElement as HTMLElement).querySelector('time');
    expect(time?.getAttribute('datetime')).toBe(new Date(2020, 4, 1, 12, 44, 30).toISOString());
  });

  it('stops ticking when destroyed', () => {
    const fixture = TestBed.createComponent(Clock);
    fixture.detectChanges();
    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });
});
