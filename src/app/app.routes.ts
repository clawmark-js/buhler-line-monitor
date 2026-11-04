import { Routes } from '@angular/router';
import { LineOverview } from './features/line/line-overview/line-overview';
import { MachineDetail } from './features/line/machine-detail/machine-detail';
import { machineExistsGuard } from './features/line/machine-exists.guard';

export const routes: Routes = [
  // Default view: the line overview.
  { path: '', component: LineOverview },
  // Replaces the overview; the navigation bar above shows which machine is open.
  { path: 'machines/:id', component: MachineDetail, canActivate: [machineExistsGuard] },
  { path: '**', redirectTo: '' },
];
