import { TestBed } from '@angular/core/testing';
import { Machine } from '../../../core/models/machine';
import { MachineTile } from './machine-tile';

// Name and short name differ so the test notices if the wrong one is rendered.
const ATTACHER: Machine = {
  id: 'bag-attach',
  name: 'Bag Attach',
  shortName: 'Attacher',
  icon: 'chrome_reader_mode',
  state: 'warning',
  order: 2,
};

describe('MachineTile', () => {
  async function render(machine: Machine = ATTACHER): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(MachineTile);
    fixture.componentRef.setInput('machine', machine);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the machine icon and short name', async () => {
    const host = await render();
    expect(host.querySelector('.machine-icon')?.textContent?.trim()).toBe('chrome_reader_mode');
    expect(host.querySelector('.name')?.textContent?.trim()).toBe('Attacher');
    expect(host.textContent).not.toContain('Bag Attach');
  });

  it('announces the name before the state', async () => {
    const host = await render();
    const name = host.querySelector('.name');
    const badge = host.querySelector('[role="img"]');
    expect(name && badge && name.compareDocumentPosition(badge)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('marks itself with the machine state for styling', async () => {
    expect((await render()).dataset['state']).toBe('warning');
  });

  it('exposes the state to assistive technologies', async () => {
    const badge = (await render()).querySelector('[role="img"]');
    expect(badge?.getAttribute('aria-label')).toBe('Warning');
  });
});
