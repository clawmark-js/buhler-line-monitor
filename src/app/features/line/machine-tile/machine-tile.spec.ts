import { TestBed } from '@angular/core/testing';
import { Machine } from '../../../core/models/machine';
import { MachineTile } from './machine-tile';

const PACKER: Machine = {
  id: 'packer',
  name: 'Packer',
  shortName: 'Packer',
  icon: 'call_to_action',
  state: 'warning',
  order: 3,
};

describe('MachineTile', () => {
  async function render(machine: Machine = PACKER): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(MachineTile);
    fixture.componentRef.setInput('machine', machine);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the machine icon and short name', async () => {
    const host = await render();
    expect(host.querySelector('.machine-icon')?.textContent?.trim()).toBe('call_to_action');
    expect(host.querySelector('.name')?.textContent?.trim()).toBe('Packer');
  });

  it('marks itself with the machine state for styling', async () => {
    expect((await render()).dataset['state']).toBe('warning');
  });

  it('exposes the state to assistive technologies', async () => {
    const badge = (await render()).querySelector('[role="img"]');
    expect(badge?.getAttribute('aria-label')).toBe('Warning');
  });
});
