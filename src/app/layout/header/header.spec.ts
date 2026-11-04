import { TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the Bühler logo with alt text', async () => {
    const logo = (await render()).querySelector('img');
    expect(logo?.getAttribute('src')).toBe('buhler-logo.svg');
    expect(logo?.getAttribute('alt')).toBe('Bühler');
  });

  it('renders the live clock', async () => {
    expect((await render()).querySelector('app-clock time')).not.toBeNull();
  });

  it('renders the current user', async () => {
    expect((await render()).textContent).toContain('Operator');
  });

  it('uses a header landmark', async () => {
    expect((await render()).querySelector('header')).not.toBeNull();
  });
});
