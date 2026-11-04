import { Machine, MACHINE_STATES, MachineState } from './models/machine';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isMachineState(value: unknown): value is MachineState {
  return (MACHINE_STATES as readonly unknown[]).includes(value);
}

function isMachine(value: unknown): value is Machine {
  return (
    isRecord(value) &&
    isNonEmptyString(value['id']) &&
    isNonEmptyString(value['name']) &&
    isNonEmptyString(value['shortName']) &&
    isNonEmptyString(value['icon']) &&
    isMachineState(value['state']) &&
    typeof value['order'] === 'number'
  );
}

/**
 * Validates a machines response and returns the machines in production line order.
 * Throws when the data does not match the domain model, so callers end up in their error path.
 */
export function parseMachines(value: unknown): Machine[] {
  if (!Array.isArray(value)) {
    throw new Error('Machines response is not an array.');
  }
  const invalid = value.findIndex((item) => !isMachine(item));
  if (invalid !== -1) {
    throw new Error(`Machine at index ${invalid} does not match the domain model.`);
  }
  return [...(value as Machine[])].sort((a, b) => a.order - b.order);
}
