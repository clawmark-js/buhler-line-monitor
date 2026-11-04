import { Component, input } from '@angular/core';
import { Machine } from '../../../core/models/machine';
import { Icon } from '../../../shared/icon/icon';
import { MachineStateBadge } from '../../../shared/machine-state-badge/machine-state-badge';

/** One machine of the line overview: machine icon, short name and state. */
@Component({
  selector: 'app-machine-tile',
  imports: [Icon, MachineStateBadge],
  templateUrl: './machine-tile.html',
  styleUrl: './machine-tile.scss',
  host: {
    '[attr.data-state]': 'machine().state',
  },
})
export class MachineTile {
  readonly machine = input.required<Machine>();
}
