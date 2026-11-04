import { Component, inject } from '@angular/core';
import { MachineStore } from '../../../core/machine-store';
import { MachineStateBadge } from '../../../shared/machine-state-badge/machine-state-badge';

/** Horizontal bar listing the machines of the line with their current state. */
@Component({
  selector: 'app-machine-nav',
  imports: [MachineStateBadge],
  templateUrl: './machine-nav.html',
  styleUrl: './machine-nav.scss',
})
export class MachineNav {
  protected readonly machines = inject(MachineStore).machines;
}
