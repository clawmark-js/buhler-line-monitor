import { computed, signal } from '@angular/core';
import { MachineStore } from '../app/core/machine-store';
import { Machine, MachineState } from '../app/core/models/machine';

/** Machines used across component tests; name and short name differ for Bag Attach / Bag Closer. */
export const TEST_MACHINES: Machine[] = [
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

/** A controllable stand-in for `MachineStore`. */
export function createFakeMachineStore(machines: Machine[] = TEST_MACHINES) {
  const list = signal(machines);
  const loading = signal(false);
  const store: Pick<MachineStore, 'machines' | 'loading'> = {
    machines: computed(() => list()),
    loading: loading.asReadonly(),
  };
  return {
    provider: { provide: MachineStore, useValue: store },
    loading,
    setState(id: string, state: MachineState): void {
      list.update((all) => all.map((m) => (m.id === id ? { ...m, state } : m)));
    },
  };
}
