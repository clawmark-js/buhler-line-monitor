import { Routes } from '@angular/router';
import { LineOverview } from './features/line/line-overview/line-overview';

export const routes: Routes = [
  { path: '', component: LineOverview },
  { path: '**', redirectTo: '' },
];
