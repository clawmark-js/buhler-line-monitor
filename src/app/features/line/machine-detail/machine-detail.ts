import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MACHINE_STATE_CONFIG } from '../../../core/machine-state-config';
import { MachineStore } from '../../../core/machine-store';
import { Icon } from '../../../shared/icon/icon';
import { MachineStateBadge } from '../../../shared/machine-state-badge/machine-state-badge';

/** Details of the machine selected in the route (`machines/:id`), updating live. */
@Component({
  selector: 'app-machine-detail',
  imports: [RouterLink, Icon, MachineStateBadge],
  templateUrl: './machine-detail.html',
  styleUrl: './machine-detail.scss',
})
export class MachineDetail {
  /** Machine id, bound from the route parameter. */
  readonly id = input.required<string>();

  private readonly machines = inject(MachineStore).machines;

  protected readonly machine = computed(() => this.machines().find((m) => m.id === this.id()));
  protected readonly stateLabel = computed(() => {
    const machine = this.machine();
    return machine ? MACHINE_STATE_CONFIG[machine.state].label : '';
  });
}
