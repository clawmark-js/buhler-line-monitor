import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MachineNav } from './features/line/machine-nav/machine-nav';
import { Header } from './layout/header/header';

@Component({
  imports: [RouterOutlet, Header, MachineNav],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
