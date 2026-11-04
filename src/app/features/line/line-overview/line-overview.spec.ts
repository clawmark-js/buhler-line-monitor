import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { createFakeMachineStore } from '../../../../testing/fake-machine-store';
import { LineOverview } from './line-overview';

describe('LineOverview', () => {
  let fake: ReturnType<typeof createFakeMachineStore>;

  beforeEach(() => {
    fake = createFakeMachineStore();
    TestBed.configureTestingModule({
      providers: [fake.provider, provideRouter([])],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(LineOverview);
    await fixture.whenStable();
    return fixture;
  }

  function links(host: HTMLElement): HTMLAnchorElement[] {
    return Array.from(host.querySelectorAll<HTMLAnchorElement>('.overview a'));
  }

  it('is a labelled region with an ordered list of the line', async () => {
    const host = (await render()).nativeElement as HTMLElement;
    expect(host.querySelector('section')?.getAttribute('aria-label')).toBe('Production line');
    expect(host.querySelectorAll('ol > li')).toHaveLength(3);
  });

  it('links one tile per machine to its detail, in store order', async () => {
    const all = links((await render()).nativeElement);
    expect(all.map((a) => a.getAttribute('href'))).toEqual([
      '/machines/scale',
      '/machines/bag-attach',
      '/machines/bag-closer',
    ]);
    expect(all.map((a) => a.querySelector('app-machine-tile'))).not.toContain(null);
  });

  it('names each link by machine and state, with the tile hidden', async () => {
    const [, attacher] = links((await render()).nativeElement);
    expect(attacher.getAttribute('aria-label')).toBe('Attacher – Alarm');
    expect(attacher.querySelector('app-machine-tile')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('reflects state changes from the store', async () => {
    const fixture = await render();
    fake.setState('scale', 'warning');
    await fixture.whenStable();
    const [scale] = links(fixture.nativeElement);
    expect(scale.querySelector<HTMLElement>('app-machine-tile')?.dataset['state']).toBe('warning');
    expect(scale.getAttribute('aria-label')).toBe('Scale – Warning');
  });
});
