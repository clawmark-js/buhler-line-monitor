import { computed, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { User } from './models/user';

/** The signed-in user. */
@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly resource = httpResource<User>(() => 'data/user.json');

  /** The signed-in user, or `null` while loading or after an error. */
  readonly user = computed(() => (this.resource.hasValue() ? this.resource.value() : null));
}
