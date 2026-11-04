import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Machine, MachineState } from './models/machine';
import { parseMachines } from './parse-machines';

/** Single source of machine state for every view of the line. */
@Injectable({ providedIn: 'root' })
export class MachineStore {
  /** Machines as loaded, validated and sorted by line order once per response. */
  private readonly resource = httpResource(() => 'data/machines.json', { parse: parseMachines });

  /**
   * Latest live state per machine id. Kept apart from the loaded data so updates that arrive
   * before loading finishes are not lost and are applied as soon as the machines are known.
   */
  private readonly liveStates = signal<Readonly<Record<string, MachineState>>>({});

  /** Machines in production line order; empty while loading or after an error. */
  readonly machines = computed<Machine[]>(() => {
    const machines = this.resource.hasValue() ? this.resource.value() : [];
    const live = this.liveStates();
    return machines.map((machine) => {
      const state = live[machine.id];
      return state && state !== machine.state ? { ...machine, state } : machine;
    });
  });
  readonly loading = this.resource.isLoading;
  readonly error = computed(() => (this.resource.error() ? 'Machines could not be loaded.' : null));

  updateState(id: string, state: MachineState): void {
    this.liveStates.update((states) => ({ ...states, [id]: state }));
  }
}
