import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { createFakeMachineStore } from '../../../../testing/fake-machine-store';
import { MachineDetail } from './machine-detail';

describe('MachineDetail', () => {
  let fake: ReturnType<typeof createFakeMachineStore>;

  beforeEach(() => {
    fake = createFakeMachineStore();
    TestBed.configureTestingModule({ providers: [fake.provider, provideRouter([])] });
  });

  async function render(id = 'bag-attach') {
    const fixture = TestBed.createComponent(MachineDetail);
    fixture.componentRef.setInput('id', id);
    await fixture.whenStable();
    return fixture;
  }

  it('shows full name as heading, short name, machine icon and state', async () => {
    const host = (await render()).nativeElement as HTMLElement;
    const section = host.querySelector('section');
    const heading = host.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe('Bag Attach');
    expect(section?.getAttribute('aria-labelledby')).toBe(heading?.id);
    expect(host.querySelector('.machine-icon')?.textContent?.trim()).toBe('b');
    expect(host.querySelector('.facts')?.textContent).toContain('Attacher');
    expect(host.querySelector('.state-label')?.textContent?.trim()).toBe('Alarm');
    expect(host.querySelector<HTMLElement>('.head')?.dataset['state']).toBe('alarm');
  });

  it('updates live when the machine state changes', async () => {
    const fixture = await render();
    fake.setState('bag-attach', 'running');
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector<HTMLElement>('.head')?.dataset['state']).toBe('running');
    expect(host.querySelector('.state-label')?.textContent?.trim()).toBe('Running');
  });

  it('follows a change of the route id', async () => {
    const fixture = await render();
    fixture.componentRef.setInput('id', 'scale');
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('h2')?.textContent).toContain(
      'Scale',
    );
  });

  it('shows the fault message of a machine in alarm', async () => {
    const host = (await render()).nativeElement as HTMLElement;
    expect(host.querySelector('.message')?.textContent?.trim()).toBe('Bag jam at clamp 2');
  });

  it('shows no message row for a running machine', async () => {
    const host = (await render('scale')).nativeElement as HTMLElement;
    expect(host.querySelector('.message')).toBeNull();
    expect(host.querySelector('.facts')?.textContent).not.toContain('Message');
  });

  it('announces the state once', async () => {
    const host = (await render()).nativeElement as HTMLElement;
    expect(host.textContent?.match(/Alarm/g)).toHaveLength(1);
  });

  it('has an accessible link back to the overview', async () => {
    const close = ((await render()).nativeElement as HTMLElement).querySelector('a.close');
    expect(close?.getAttribute('href')).toBe('/');
    expect(close?.getAttribute('aria-label')).toBe('Close detail');
  });

  it('renders nothing for an unknown machine', async () => {
    const host = (await render('unknown')).nativeElement as HTMLElement;
    expect(host.querySelector('section')).toBeNull();
  });
});
