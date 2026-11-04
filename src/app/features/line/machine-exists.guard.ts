import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { MachineStore } from '../../core/machine-store';

/**
 * Lets `machines/:id` through only for a known machine. Waits until the machines are loaded;
 * unknown ids (and a failed load) redirect to the line overview.
 */
export const machineExistsGuard: CanActivateFn = (route) => {
  const store = inject(MachineStore);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  return toObservable(store.loading).pipe(
    filter((loading) => !loading),
    take(1),
    map(() => store.machines().some((machine) => machine.id === id) || router.createUrlTree([''])),
  );
};
