import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MachineStore } from './machine-store';
import { Machine } from './models/machine';

const MACHINES: Machine[] = [
  { id: 'packer', name: 'Packer', shortName: 'Packer', icon: 'a', state: 'running', order: 2 },
  {
    id: 'scale',
    name: 'Scale',
    shortName: 'Scale',
    icon: 'b',
    state: 'alarm',
    order: 1,
    message: 'Overload',
  },
];

const URL = 'data/machines.json';

describe('MachineStore', () => {
  let store: MachineStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(MachineStore);
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

  it('is loading until the response arrives', async () => {
    expect(store.loading()).toBe(true);
    expect(store.machines()).toEqual([]);
    await respond(MACHINES);
    expect(store.loading()).toBe(false);
  });

  it('exposes machines sorted by line order', async () => {
    await respond(MACHINES);
    expect(store.machines().map((m) => m.id)).toEqual(['scale', 'packer']);
    expect(store.error()).toBeNull();
  });

  it('reports an error when loading fails', async () => {
    await respond('Not found', { status: 404, statusText: 'Not Found' });
    expect(store.loading()).toBe(false);
    expect(store.error()).toBe('Machines could not be loaded.');
    expect(store.machines()).toEqual([]);
  });

  it('updates the state of a single machine', async () => {
    await respond(MACHINES);
    store.updateState('packer', 'warning');
    expect(store.machines().map((m) => m.state)).toEqual(['alarm', 'warning']);
  });

  it('applies state updates that arrive before the machines are loaded', async () => {
    store.updateState('packer', 'warning');
    await respond(MACHINES);
    expect(store.machines().find((m) => m.id === 'packer')?.state).toBe('warning');
  });

  it('keeps unchanged machines as the same objects when a state changes', async () => {
    await respond(MACHINES);
    const [scaleBefore] = store.machines();
    store.updateState('packer', 'warning');
    expect(store.machines()[0]).toBe(scaleBefore);
  });

  it('drops the loaded fault message when a live update changes the state', async () => {
    await respond(MACHINES);
    store.updateState('scale', 'running');
    const scale = store.machines().find((m) => m.id === 'scale');
    expect(scale?.state).toBe('running');
    expect(scale?.message).toBeUndefined();
  });

  it('shows the message carried by a live update', async () => {
    await respond(MACHINES);
    store.updateState('packer', 'warning', 'Film roll almost empty');
    expect(store.machines().find((m) => m.id === 'packer')?.message).toBe('Film roll almost empty');
  });

  it('replaces the message when the fault changes but the state stays', async () => {
    await respond(MACHINES);
    store.updateState('scale', 'alarm', 'Load cell disconnected');
    expect(store.machines().find((m) => m.id === 'scale')?.message).toBe('Load cell disconnected');
  });

  it('reports an error when the response does not match the model', async () => {
    await respond({ machines: MACHINES });
    expect(store.error()).toBe('Machines could not be loaded.');
    expect(store.machines()).toEqual([]);
  });
});
