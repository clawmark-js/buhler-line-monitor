import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { User } from '../../core/models/user';
import { UserStore } from '../../core/user-store';
import { Header } from './header';

describe('Header', () => {
  const user = signal<User | null>({ id: 'operator', name: 'Operator' });

  beforeEach(() => {
    user.set({ id: 'operator', name: 'Operator' });
    TestBed.configureTestingModule({
      providers: [{ provide: UserStore, useValue: { user } }],
    });
  });

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

  it('renders the signed-in user from the store', async () => {
    user.set({ id: 'jane', name: 'Jane Doe' });
    expect((await render()).textContent).toContain('Jane Doe');
  });

  it('hides the user while no user is available', async () => {
    user.set(null);
    expect((await render()).querySelector('app-icon[name="account_circle"]')).toBeNull();
  });

  it('uses a header landmark', async () => {
    expect((await render()).querySelector('header')).not.toBeNull();
  });
});
