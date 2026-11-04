import { Machine, MachineState } from './models/machine';

export interface MachineStatePresentation {
  /** Material Symbols icon name. */
  icon: string;
  /** Use the filled variant of the icon. */
  filled: boolean;
  /** Human-readable label, also used for accessible names. */
  label: string;
}

/**
 * Single source of truth for the icon and label of each machine state.
 * Colors are styling and live in `src/styles/_machine-state.scss`.
 */
export const MACHINE_STATE_CONFIG: Record<MachineState, MachineStatePresentation> = {
  running: {
    icon: 'settings_backup_restore',
    filled: false,
    label: 'Running',
  },
  alarm: { icon: 'error', filled: false, label: 'Alarm' },
  warning: { icon: 'warning', filled: true, label: 'Warning' },
};

/** Accessible name of a machine with its current state, e.g. "Packer – Warning". */
export function machineLabel(machine: Pick<Machine, 'shortName' | 'state'>): string {
  return `${machine.shortName} – ${MACHINE_STATE_CONFIG[machine.state].label}`;
}
