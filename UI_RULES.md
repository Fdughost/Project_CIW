# UI_RULES.md

These rules define the visual system for **Chloe in Wonderland**. They are meant to make AI-assisted UI work repeatable instead of taste-by-guessing.

## Direction

The interface is a storybook archive with a physical object table. The player should feel they are handling props from Chloe and Alex's story: a harmonica score, guard cards, a workflow terminal, a Nokia phone, a chase map, a silver pendant, a library card, and a moonlit note.

Use GPT-generated images only as visual references. The production UI should be real HTML/CSS controls with accessible states and responsive behavior.

## Layout

- Desktop: asymmetric two-panel layout.
  - Left: storybook/archive page.
  - Right: object table and chapter gadget.
- Tablet: keep the same visual language, allow panels to stack if width is tight.
- Mobile: single column, story first, gadget second, fixed hint bar compact enough to avoid blocking controls.
- HUD and bottom command bar are persistent architecture, not per-chapter art.
- Do not put cards inside cards unless the inner element is a real repeated item, modal, or prop component.

## Tokens

Prefer existing CSS variables in `src/index.css`:

- Ink: `--ciw-color-ink`
- Muted: `--ciw-color-muted`
- Night: `--ciw-color-night`
- Forest: `--ciw-color-forest`
- Rose: `--ciw-color-rose`
- Lantern: `--ciw-color-lantern`
- Paper: `--ciw-color-paper`
- Surface: `--ciw-color-surface`
- Primary: `--ciw-color-primary`
- Accent: `--ciw-color-accent`
- Warm: `--ciw-color-warm`
- Panel radius: `--ciw-radius-panel`
- Control radius: `--ciw-radius-control`
- Panel shadow: `--ciw-shadow-panel`
- Control shadow: `--ciw-shadow-control`
- Animation duration: `--ciw-duration`

Spacing should stay on an 8px rhythm: `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`. Do not introduce arbitrary spacing like `13px` or `37px`.

## Typography

- Display/storybook titles: `var(--ciw-font-display)`.
- UI and body text: system sans with Chinese fallback already defined on `body`.
- Keep compact panel text compact. Hero-scale text belongs only on intro/ending or chapter story titles.
- Letter spacing should be `0` unless used for small uppercase labels.

## Controls

- Primary command: brass or ink button.
- Secondary command: paper/white button with subtle ring.
- Icon-like HUD controls: circular gadgets.
- Numeric or mechanical controls: stable dimensions, no layout shift on hover or state change.
- Touch targets should be at least 44px tall (matches iOS HIG / Material Design and `planC.md` §Motion And Mobile Contract).
- Disabled controls must keep their layout and signal disabled with opacity, not disappearing.

## Animation

Animations should make the object feel tangible:

- Harmonica/lock: note pulse, wheel click, lock shudder/open feedback.
- Guards: selected card lift, truth/lie marker color, badge handoff glow.
- Workflow: terminal pulse, blocked node blink, success build glow.
- Nokia: key press depression, screen flicker, wrong-code shake, unlocked screen glow.
- Chase: progress pulse, timer drain, mistake distance feedback, pendant drop.
- Pendant: rotation, flip, slot magnetism, snap together, inscription reveal.
- Library: drawer/filter press, card stamp, blank zoom.
- Moon card: light slider reveal, card tilt, hidden ink glow, voucher reveal.

Respect `prefers-reduced-motion: reduce`.

## Mobile Rules

- All drag interactions need button alternatives.
- Bottom hint drawer must not cover critical controls.
- Use single-column grids for small screens.
- Avoid tiny text inside prop controls.
- Keep Nokia keypad, chase choices, pendant controls, and moonlight slider fully operable at `375x812`.

## Do Not

- Do not use the GPT reference images as full-page backgrounds.
- Do not introduce unrelated visual themes per chapter.
- Do not rely on alert boxes for puzzle feedback.
- Do not use generic form fields when a chapter has a physical prop interaction.
- Do not add new purple/blue gradients as the dominant page language.
- Do not create decorative orbs, bokeh blobs, or floating marketing-card layouts.
