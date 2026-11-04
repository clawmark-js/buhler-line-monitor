import { computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MachineStore } from '../../../core/machine-store';
import { Machine } from '../../../core/models/machine';
import { LineOverview } from './line-overview';

const MACHINES: Machine[] = [
  { id: 'scale', name: 'Scale', shortName: 'Scale', icon: 'a', state: 'running', order: 1 },
  {
    id: 'bag-attach',
    name: 'Bag Attach',
    shortName: 'Attacher',
    icon: 'b',
    state: 'alarm',
    order: 2,
  },
  {
    id: 'bag-closer',
    name: 'Bag Closer',
    shortName: 'Closer',
    icon: 'c',
    state: 'warning',
    order: 3,
  },
];

describe('LineOverview', () => {
  const machines = signal<Machine[]>(MACHINES);

  beforeEach(() => {
    machines.set(MACHINES);
    TestBed.configureTestingModule({
      providers: [{ provide: MachineStore, useValue: { machines: computed(() => machines()) } }],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(LineOverview);
    await fixture.whenStable();
    return fixture;
  }

  function tiles(host: HTMLElement): HTMLElement[] {
    return Array.from(host.querySelectorAll<HTMLElement>('app-machine-tile'));
  }

  it('is a labelled region with an ordered list of the line', async () => {
    const host = (await render()).nativeElement as HTMLElement;
    expect(host.querySelector('section')?.getAttribute('aria-label')).toBe('Production line');
    expect(host.querySelectorAll('ol > li')).toHaveLength(3);
  });

  it('shows one tile per machine in store order', async () => {
    const names = tiles((await render()).nativeElement).map((t) => t.textContent);
    expect(names.map((n) => n?.includes('Scale'))).toEqual([true, false, false]);
    expect(names[1]).toContain('Attacher');
    expect(names[2]).toContain('Closer');
  });

  it('reflects state changes from the store', async () => {
    const fixture = await render();
    machines.update((list) => list.map((m) => (m.id === 'scale' ? { ...m, state: 'alarm' } : m)));
    await fixture.whenStable();
    expect(tiles(fixture.nativeElement)[0].dataset['state']).toBe('alarm');
  });
});
