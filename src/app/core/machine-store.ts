import { computed, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Machine, MachineState } from './models/machine';

/** Single source of machine state for every view of the line. */
@Injectable({ providedIn: 'root' })
export class MachineStore {
  private readonly resource = httpResource<Machine[]>(() => 'data/machines.json');

  /** Machines in production line order; empty while loading or after an error. */
  readonly machines = computed(() =>
    this.resource.hasValue() ? [...this.resource.value()].sort((a, b) => a.order - b.order) : [],
  );
  readonly loading = this.resource.isLoading;
  readonly error = computed(() => (this.resource.error() ? 'Machines could not be loaded.' : null));

  updateState(id: string, state: MachineState): void {
    if (!this.resource.hasValue()) return;
    this.resource.value.update((machines) =>
      machines.map((machine) => (machine.id === id ? { ...machine, state } : machine)),
    );
  }
}
