import { MACHINE_STATE_CONFIG } from './machine-state-config';
import { MACHINE_STATES } from './models/machine';

describe('MACHINE_STATE_CONFIG', () => {
  it('has an entry for every machine state', () => {
    expect(Object.keys(MACHINE_STATE_CONFIG).sort()).toEqual([...MACHINE_STATES].sort());
  });

  it.each(MACHINE_STATES)('defines icon and label for "%s"', (state) => {
    const { icon, label } = MACHINE_STATE_CONFIG[state];
    expect(icon).toBeTruthy();
    expect(label).toBeTruthy();
  });
});
