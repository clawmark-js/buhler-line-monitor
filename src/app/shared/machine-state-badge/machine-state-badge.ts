import { Component, computed, input } from '@angular/core';
import { MACHINE_STATE_CONFIG } from '../../core/machine-state-config';
import { MachineState } from '../../core/models/machine';
import { Icon } from '../icon/icon';

/** State icon of a machine, announced to assistive technologies by its label. */
@Component({
  selector: 'app-machine-state-badge',
  imports: [Icon],
  template: '<app-icon [name]="presentation().icon" [filled]="presentation().filled" />',
  styleUrl: './machine-state-badge.scss',
  host: {
    role: 'img',
    '[attr.aria-label]': 'presentation().label',
  },
})
export class MachineStateBadge {
  readonly state = input.required<MachineState>();

  protected readonly presentation = computed(() => MACHINE_STATE_CONFIG[this.state()]);
}
