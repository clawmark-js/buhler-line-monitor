import { TestBed } from '@angular/core/testing';
import { Icon } from './icon';

describe('Icon', () => {
  async function render(name: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', name);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the icon name as a Material Symbols ligature', async () => {
    const host = await render('schedule');
    expect(host.textContent?.trim()).toBe('schedule');
    expect(host.classList).toContain('material-symbols-outlined');
  });

  it('is outlined by default and can be filled', async () => {
    const fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', 'warning');
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.classList).not.toContain('filled');

    fixture.componentRef.setInput('filled', true);
    await fixture.whenStable();
    expect(host.classList).toContain('filled');
  });

  it('is hidden from assistive technologies', async () => {
    const host = await render('schedule');
    expect(host.getAttribute('aria-hidden')).toBe('true');
  });
});
