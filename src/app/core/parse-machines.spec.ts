import { Machine } from './models/machine';
import { parseMachines } from './parse-machines';

const PACKER: Machine = {
  id: 'packer',
  name: 'Packer',
  shortName: 'Packer',
  icon: 'call_to_action',
  state: 'running',
  order: 2,
};
const SCALE: Machine = { ...PACKER, id: 'scale', name: 'Scale', shortName: 'Scale', order: 1 };

describe('parseMachines', () => {
  it('returns valid machines sorted by line order', () => {
    expect(parseMachines([PACKER, SCALE]).map((m) => m.id)).toEqual(['scale', 'packer']);
  });

  it('does not mutate the response', () => {
    const response = [PACKER, SCALE];
    parseMachines(response);
    expect(response.map((m) => m.id)).toEqual(['packer', 'scale']);
  });

  it.each([{}, { machines: [PACKER] }, null, 'machines'])(
    'rejects a non-array response %j',
    (value) => {
      expect(() => parseMachines(value)).toThrow('not an array');
    },
  );

  it.each([
    ['unknown state', { ...PACKER, state: 'broken' }],
    ['missing id', { ...PACKER, id: undefined }],
    ['empty short name', { ...PACKER, shortName: '' }],
    ['non-numeric order', { ...PACKER, order: '2' }],
    ['non-object item', 'packer'],
  ])('rejects a machine with %s', (_, machine) => {
    expect(() => parseMachines([SCALE, machine])).toThrow('index 1');
  });
});
