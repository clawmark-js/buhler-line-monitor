import { Component, inject } from '@angular/core';
import { MachineStore } from '../../../core/machine-store';
import { MachineTile } from '../machine-tile/machine-tile';

/** The production line: machine tiles in line order, connected in sequence. */
@Component({
  selector: 'app-line-overview',
  imports: [MachineTile],
  templateUrl: './line-overview.html',
  styleUrl: './line-overview.scss',
})
export class LineOverview {
  protected readonly machines = inject(MachineStore).machines;
}
