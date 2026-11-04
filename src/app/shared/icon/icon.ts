import { Component, input } from '@angular/core';

/**
 * Renders a Material Symbols icon by name. Icons are decorative: the surrounding element is
 * responsible for the accessible name.
 */
@Component({
  selector: 'app-icon',
  template: '{{ name() }}',
  styleUrl: './icon.scss',
  host: {
    class: 'material-symbols-outlined',
    'aria-hidden': 'true',
  },
})
export class Icon {
  readonly name = input.required<string>();
}
