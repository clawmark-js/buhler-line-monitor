export const MACHINE_STATES = ['running', 'alarm', 'warning'] as const;

export type MachineState = (typeof MACHINE_STATES)[number];

export interface Machine {
  id: string;
  /** Full name from the specification, e.g. "Bag Attach". */
  name: string;
  /** Short name shown in the navigation bar and tiles, e.g. "Attacher". */
  shortName: string;
  /** Material Symbols icon name. */
  icon: string;
  state: MachineState;
  /** Position in the production line, starting at 1. */
  order: number;
  /** Short fault description while in alarm or warning, e.g. "Bag jam at clamp 2". */
  message?: string;
}
