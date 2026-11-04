import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserStore } from './user-store';

const URL = 'data/user.json';

describe('UserStore', () => {
  let store: UserStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(UserStore);
    http = TestBed.inject(HttpTestingController);
    TestBed.tick();
  });

  afterEach(() => http.verify());

  /** Responds to the pending request and lets the resource apply the result. */
  async function respond(
    body: unknown,
    init?: { status: number; statusText: string },
  ): Promise<void> {
    http.expectOne(URL).flush(body as object, init);
    await TestBed.inject(ApplicationRef).whenStable();
  }

  it('has no user until the response arrives', async () => {
    expect(store.user()).toBeNull();
    await respond({ id: 'operator', name: 'Operator' });
    expect(store.user()).toEqual({ id: 'operator', name: 'Operator' });
  });

  it('has no user when loading fails', async () => {
    await respond('Not found', { status: 404, statusText: 'Not Found' });
    expect(store.user()).toBeNull();
  });
});
