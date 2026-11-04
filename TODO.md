# TODO

Known issues and deliberate deviations, kept out of scope to stay true to the reference mockup
(`docs/mockup.png`).

## Accessibility

- [ ] Color contrast: white text on the warning (orange, ~2:1) and alarm (red, ~3.5:1) backgrounds
      misses WCAG AA (4.5:1). Options: slightly darker state colors, or dark text on warning.
- [ ] Icon contrast: the green running icon on grey (1.84:1) and the white warning icon on orange
      (2.17:1) miss the WCAG 3:1 minimum for non-text graphics. The state is still announced to
      assistive technologies, so it is not conveyed by color alone.
- [x] Keyboard scrolling of the navigation bar and line overview: resolved in Step 7, items are
      links now and focusing one scrolls it into view. Verify in the Step 8 layout check.

## Layout

- [ ] Header at narrow widths (375 px): the clock wraps and the user name is pushed off-screen.
      The mockup only covers desktop; handle in the Step 8 layout check (e.g. hide the user name
      or shrink the logo below a breakpoint).
- [ ] Loading and error states: while `machines.json` loads, or if it fails, the navigation bar
      and the "Production line" region render empty. `MachineStore` already exposes `loading`
      and `error`; show them in the UI in Step 8.
