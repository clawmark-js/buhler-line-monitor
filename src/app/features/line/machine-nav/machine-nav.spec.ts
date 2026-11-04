import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { createFakeMachineStore } from '../../../../testing/fake-machine-store';
import { MachineNav } from './machine-nav';

@Component({ template: '' })
class Blank {}

describe('MachineNav', () => {
  let fake: ReturnType<typeof createFakeMachineStore>;

  beforeEach(() => {
    fake = createFakeMachineStore();
    TestBed.configureTestingModule({
      providers: [fake.provider, provideRouter([{ path: 'machines/:id', component: Blank }])],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(MachineNav);
    await fixture.whenStable();
    return fixture;
  }

  function links(host: HTMLElement): HTMLAnchorElement[] {
    return Array.from(host.querySelectorAll<HTMLAnchorElement>('li > a'));
  }

  it('is a labelled navigation landmark', async () => {
    const host = (await render()).nativeElement as HTMLElement;
    expect(host.querySelector('nav')?.getAttribute('aria-label')).toBe('Machines');
  });

  it('links every machine to its detail, in store order', async () => {
    const hrefs = links((await render()).nativeElement).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/machines/scale', '/machines/bag-attach', '/machines/bag-closer']);
  });

  it('shows the short name and marks the state for styling', async () => {
    const [, attacher] = links((await render()).nativeElement);
    expect(attacher.querySelector('.name')?.textContent?.trim()).toBe('Attacher');
    expect(attacher.dataset['state']).toBe('alarm');
  });

  it('names each link by machine and state, with the badge hidden', async () => {
    const [scale] = links((await render()).nativeElement);
    expect(scale.getAttribute('aria-label')).toBe('Scale – Running');
    expect(scale.querySelector('app-machine-state-badge')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('marks the machine of the current route as selected', async () => {
    const fixture = await render();
    await TestBed.inject(Router).navigateByUrl('/machines/bag-attach');
    await fixture.whenStable();
    const [scale, attacher] = links(fixture.nativeElement);
    expect(attacher.classList).toContain('selected');
    expect(attacher.getAttribute('aria-current')).toBe('page');
    expect(scale.classList).not.toContain('selected');
    expect(scale.hasAttribute('aria-current')).toBe(false);
  });

  it('reflects state changes from the store', async () => {
    const fixture = await render();
    fake.setState('scale', 'alarm');
    await fixture.whenStable();
    const [scale] = links(fixture.nativeElement);
    expect(scale.dataset['state']).toBe('alarm');
    expect(scale.getAttribute('aria-label')).toBe('Scale – Alarm');
  });
});
