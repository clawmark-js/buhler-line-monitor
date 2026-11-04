import { effect, EnvironmentInjector, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { MachineStore } from '../../core/machine-store';

/**
 * Lets `machines/:id` through only for a known machine. Waits until the machines are loaded;
 * unknown ids (and a failed load) redirect to the line overview.
 */
export const machineExistsGuard: CanActivateFn = (route) => {
  const store = inject(MachineStore);
  const router = inject(Router);
  const injector = inject(EnvironmentInjector);
  const id = route.paramMap.get('id');

  const decide = (): boolean | UrlTree =>
    store.machines().some((machine) => machine.id === id) || router.createUrlTree(['']);

  if (!store.loading()) {
    return decide();
  }
  // Not toObservable(): its effect lives as long as the root injector, one per navigation.
  // This effect destroys itself as soon as loading has finished.
  return new Promise((resolve) => {
    const watcher = effect(
      () => {
        if (!store.loading()) {
          watcher.destroy();
          resolve(decide());
        }
      },
      { injector },
    );
  });
};
