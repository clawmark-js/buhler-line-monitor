import machines from '../../../public/data/machines.json';
import user from '../../../public/data/user.json';
import { Machine, MACHINE_STATES } from './models/machine';
import { User } from './models/user';

// Guards the mock data against drifting from the domain model.
describe('mock data', () => {
  describe('machines.json', () => {
    const data: Machine[] = machines as Machine[];

    it('contains the four machines of the line in order', () => {
      const sorted = [...data].sort((a, b) => a.order - b.order);
      expect(sorted.map((m) => m.name)).toEqual(['Scale', 'Bag Attach', 'Packer', 'Bag Closer']);
      expect(sorted.map((m) => m.shortName)).toEqual(['Scale', 'Attacher', 'Packer', 'Closer']);
      expect(sorted.map((m) => m.order)).toEqual([1, 2, 3, 4]);
    });

    it('has unique ids', () => {
      expect(new Set(data.map((m) => m.id)).size).toBe(data.length);
    });

    it('uses only known states and has an icon for every machine', () => {
      for (const machine of data) {
        expect(MACHINE_STATES).toContain(machine.state);
        expect(machine.icon).toBeTruthy();
      }
    });
  });

  describe('user.json', () => {
    it('describes the signed-in user', () => {
      const data: User = user;
      expect(data.id).toBeTruthy();
      expect(data.name).toBe('Operator');
    });
  });
});
