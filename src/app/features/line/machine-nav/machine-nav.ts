import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { machineLabel } from '../../../core/machine-state-config';
import { MachineStore } from '../../../core/machine-store';
import { MachineStateBadge } from '../../../shared/machine-state-badge/machine-state-badge';

/** Horizontal bar listing the machines of the line with their current state; links to details. */
@Component({
  selector: 'app-machine-nav',
  imports: [RouterLink, RouterLinkActive, MachineStateBadge],
  templateUrl: './machine-nav.html',
  styleUrl: './machine-nav.scss',
})
export class MachineNav {
  protected readonly machines = inject(MachineStore).machines;
  protected readonly label = machineLabel;
}
