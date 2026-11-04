import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Machine, MachineState } from './models/machine';
import { parseMachines } from './parse-machines';

/** A live status of one machine; the message belongs to this status only. */
interface LiveStatus {
  state: MachineState;
  message?: string;
}

/** Single source of machine state for every view of the line. */
@Injectable({ providedIn: 'root' })
export class MachineStore {
  /** Machines as loaded, validated and sorted by line order once per response. */
  private readonly resource = httpResource(() => 'data/machines.json', { parse: parseMachines });

  /**
   * Latest live status per machine id. Kept apart from the loaded data so updates that arrive
   * before loading finishes are not lost and are applied as soon as the machines are known.
   */
  private readonly liveStatuses = signal<Readonly<Record<string, LiveStatus>>>({});

  /** Machines in production line order; empty while loading or after an error. */
  readonly machines = computed<Machine[]>(() => {
    const machines = this.resource.hasValue() ? this.resource.value() : [];
    const live = this.liveStatuses();
    return machines.map((machine) => {
      const status = live[machine.id];
      if (!status || (status.state === machine.state && status.message === machine.message)) {
        return machine;
      }
      // The live message (also when undefined) replaces the loaded one, so a fault message never
      // outlives the status it belongs to.
      return { ...machine, ...status };
    });
  });
  readonly loading = this.resource.isLoading;
  readonly error = computed(() => (this.resource.error() ? 'Machines could not be loaded.' : null));

  /** Applies a live status; `message` describes the fault and is dropped when omitted. */
  updateState(id: string, state: MachineState, message?: string): void {
    this.liveStatuses.update((statuses) => ({ ...statuses, [id]: { state, message } }));
  }
}
