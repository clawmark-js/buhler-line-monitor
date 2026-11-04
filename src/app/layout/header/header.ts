import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStore } from '../../core/user-store';
import { Clock } from '../../shared/clock/clock';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Clock, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly user = inject(UserStore).user;
}
