import machines from '../../../public/data/machines.json';
import user from '../../../public/data/user.json';
import { User } from './models/user';
import { parseMachines } from './parse-machines';

// Guards the mock data against drifting from the domain model.
describe('mock data', () => {
  describe('machines.json', () => {
    // parseMachines throws if any machine does not match the domain model.
    const data = parseMachines(machines);

    it('contains the four machines of the line in order', () => {
      expect(data.map((m) => m.name)).toEqual(['Scale', 'Bag Attach', 'Packer', 'Bag Closer']);
      expect(data.map((m) => m.shortName)).toEqual(['Scale', 'Attacher', 'Packer', 'Closer']);
      expect(data.map((m) => m.order)).toEqual([1, 2, 3, 4]);
    });

    it('has unique ids', () => {
      expect(new Set(data.map((m) => m.id)).size).toBe(data.length);
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
