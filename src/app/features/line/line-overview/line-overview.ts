import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { machineLabel } from '../../../core/machine-state-config';
import { MachineStore } from '../../../core/machine-store';
import { MachineTile } from '../machine-tile/machine-tile';

/** The production line: machine tiles in line order, connected in sequence; each links to details. */
@Component({
  selector: 'app-line-overview',
  imports: [RouterLink, MachineTile],
  templateUrl: './line-overview.html',
  styleUrl: './line-overview.scss',
})
export class LineOverview {
  protected readonly machines = inject(MachineStore).machines;
  protected readonly label = machineLabel;
}
