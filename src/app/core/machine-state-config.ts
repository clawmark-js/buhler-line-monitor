import { MachineState } from './models/machine';

export interface MachineStatePresentation {
  /** Material Symbols icon name. */
  icon: string;
  /** Use the filled variant of the icon. */
  filled: boolean;
  /** CSS custom property holding the state color. */
  colorToken: string;
  /** Human-readable label, also used for accessible names. */
  label: string;
}

/** Single source of truth for how each machine state is presented. */
export const MACHINE_STATE_CONFIG: Record<MachineState, MachineStatePresentation> = {
  running: {
    icon: 'settings_backup_restore',
    filled: false,
    colorToken: '--color-running',
    label: 'Running',
  },
  alarm: { icon: 'error', filled: false, colorToken: '--color-alarm', label: 'Alarm' },
  warning: { icon: 'warning', filled: true, colorToken: '--color-warning', label: 'Warning' },
};
