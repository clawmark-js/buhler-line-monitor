import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the header and machine navigation above the routed content', () => {
    const fixture = TestBed.createComponent(App);
    // Not whenStable(): the stores' requests stay pending, the layout does not depend on them.
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const order = Array.from(compiled.children).map((el) => el.tagName.toLowerCase());
    expect(order).toEqual(['app-header', 'app-machine-nav', 'main']);
    expect(compiled.querySelector('main router-outlet')).not.toBeNull();
  });
});
