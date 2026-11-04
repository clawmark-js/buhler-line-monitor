import { TestBed } from '@angular/core/testing';
import { MACHINE_STATE_CONFIG } from '../../core/machine-state-config';
import { MACHINE_STATES, MachineState } from '../../core/models/machine';
import { MachineStateBadge } from './machine-state-badge';

describe('MachineStateBadge', () => {
  async function render(state: MachineState): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(MachineStateBadge);
    fixture.componentRef.setInput('state', state);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it.each(MACHINE_STATES)('shows the configured icon and label for "%s"', async (state) => {
    const host = await render(state);
    expect(host.textContent?.trim()).toBe(MACHINE_STATE_CONFIG[state].icon);
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe(MACHINE_STATE_CONFIG[state].label);
  });
});
