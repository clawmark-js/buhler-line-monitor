# TODO

Known issues and deliberate deviations, kept out of scope to stay true to the reference mockup
(`docs/mockup.png`).

## Accessibility

- [ ] Color contrast: white text on the warning (orange, ~2:1) and alarm (red, ~3.5:1) backgrounds
      misses WCAG AA (4.5:1). Options: slightly darker state colors, or dark text on warning.
- [ ] Icon contrast: the green running icon on grey (1.84:1) and the white warning icon on orange
      (2.17:1) miss the WCAG 3:1 minimum for non-text graphics. The state is still announced to
      assistive technologies, so it is not conveyed by color alone.
- [ ] Keyboard scrolling of the navigation bar: at narrow widths (e.g. 375 px) the bar scrolls
      sideways, but its items cannot take focus yet. Resolved in Step 7, when items become links
      (focus scrolls them into view); verify in the Step 8 layout check.
