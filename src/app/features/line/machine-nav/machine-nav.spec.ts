import { computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MachineStore } from '../../../core/machine-store';
import { Machine } from '../../../core/models/machine';
import { MachineNav } from './machine-nav';

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

describe('MachineNav', () => {
  const machines = signal<Machine[]>(MACHINES);

  beforeEach(() => {
    machines.set(MACHINES);
    TestBed.configureTestingModule({
      providers: [{ provide: MachineStore, useValue: { machines: computed(() => machines()) } }],
    });
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(MachineNav);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  function items(host: HTMLElement): HTMLElement[] {
    return Array.from(host.querySelectorAll<HTMLElement>('li'));
  }

  it('is a labelled navigation landmark', async () => {
    expect((await render()).querySelector('nav')?.getAttribute('aria-label')).toBe('Machines');
  });

  it('lists the machines in store order by short name', async () => {
    const names = items(await render()).map((li) => li.querySelector('.name')?.textContent?.trim());
    expect(names).toEqual(['Scale', 'Attacher', 'Closer']);
  });

  it('marks every item with its state for styling', async () => {
    const states = items(await render()).map((li) => li.dataset['state']);
    expect(states).toEqual(['running', 'alarm', 'warning']);
  });

  it('exposes name and state to assistive technologies', async () => {
    const [scale] = items(await render());
    expect(scale.textContent).toContain('Scale');
    expect(scale.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('Running');
  });

  it('reflects state changes from the store', async () => {
    const fixture = TestBed.createComponent(MachineNav);
    await fixture.whenStable();
    machines.update((list) => list.map((m) => (m.id === 'scale' ? { ...m, state: 'alarm' } : m)));
    await fixture.whenStable();
    const [scale] = items(fixture.nativeElement as HTMLElement);
    expect(scale.dataset['state']).toBe('alarm');
  });
});
