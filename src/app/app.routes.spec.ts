import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { createFakeMachineStore } from '../testing/fake-machine-store';
import { routes } from './app.routes';

describe('routes', () => {
  let fake: ReturnType<typeof createFakeMachineStore>;

  beforeEach(() => {
    fake = createFakeMachineStore();
    TestBed.configureTestingModule({
      providers: [fake.provider, provideRouter(routes, withComponentInputBinding())],
    });
  });

  function url(): string {
    return TestBed.inject(Router).url;
  }

  it('shows the line overview without a detail at the root', async () => {
    const harness = await RouterTestingHarness.create('/');
    const page = harness.fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-line-overview')).not.toBeNull();
    expect(page.querySelector('app-machine-detail')).toBeNull();
  });

  it('shows the detail of a machine instead of the line overview (deep link)', async () => {
    const harness = await RouterTestingHarness.create('/machines/bag-closer');
    const page = harness.fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-line-overview')).toBeNull();
    expect(page.querySelector('app-machine-detail h2')?.textContent).toContain('Bag Closer');
  });

  it('redirects an unknown machine to the overview', async () => {
    await RouterTestingHarness.create('/machines/unknown');
    expect(url()).toBe('/');
  });

  it('waits for the machines to load before deciding', async () => {
    fake.loading.set(true);
    const harness = await RouterTestingHarness.create();
    const navigation = harness.navigateByUrl('/machines/scale');
    expect(url()).toBe('/');
    fake.loading.set(false);
    await navigation;
    expect(url()).toBe('/machines/scale');
  });

  it('redirects an unknown machine after waiting for the load', async () => {
    fake.loading.set(true);
    const harness = await RouterTestingHarness.create();
    const navigation = harness.navigateByUrl('/machines/unknown');
    fake.loading.set(false);
    await navigation;
    expect(url()).toBe('/');
  });

  it('redirects any other path to the overview', async () => {
    await RouterTestingHarness.create('/somewhere/else');
    expect(url()).toBe('/');
  });
});
