# UI_WORKFLOW.md

This file turns UI tuning into a visual feedback loop. Follow it for every meaningful UI change.

## Work Loop

1. Read the visual context:
   - `CIW_GPT_VISUAL_BASELINE.md`
   - `UI_RULES.md`
   - relevant components in `src/GameShell.tsx`, `src/PuzzleComponent.tsx`, and `src/puzzles/ChapterPuzzles.tsx`
   - relevant CSS in `src/index.css`
2. Decide whether the change affects layout, prop behavior, copy hierarchy, animation, or responsive behavior.
3. Implement with existing tokens/classes before adding new primitives.
4. Run verification:
   - `npm run typecheck`
   - `npm run lint`
   - `npm test`
   - `npm run build`
   - `npm run ui:screenshots`
   - `npm run ui:check` when baseline screenshots exist
   - `npm run test:e2e` when the change affects answer validation, chapter switching, progress persistence, hint behavior, or success events
5. Inspect `docs/ui-review/latest/` for desktop, tablet, and mobile screenshots.
6. Fix visual issues before reporting completion.

## Screenshot Sentinels

`npm run ui:screenshots` captures:

- intro
- chapter 1: Harmonica Lock
- chapter 2: Guard Logic Desk
- chapter 3: Build Pipeline
- chapter 4: Nokia Console
- chapter 5: Trace Map
- chapter 6: Pendant Bench
- chapter 7: Archive Cabinet
- chapter 8: Moonlight Card

Each page is captured at:

- desktop `1440x900`
- tablet `768x900`
- mobile `375x812`

The output path is `docs/ui-review/latest/`.

## Baseline Workflow

Use `npm run ui:baseline` only after reviewing screenshots and deciding the new visuals are the intended baseline.

Use `npm run ui:check` to compare `docs/ui-review/latest/` against `docs/ui-review/baseline/`. Diff images are written to `docs/ui-review/diff/`.

The default diff threshold is `1.5%`. To temporarily adjust:

```bash
UI_DIFF_THRESHOLD=0.025 npm run ui:check
```

Do not raise the threshold to hide obvious regressions such as clipped text, missing controls, bad stacking, or broken chapter gadgets.

## Visual Checklist

- Layout has a clear hierarchy: storybook left, object table right on desktop.
- HUD and command bar are consistent across chapters.
- The chapter gadget is visually dominant in the workbench.
- Text fits inside controls at desktop, tablet, and mobile.
- Interactive controls have hover, focus, disabled, active/error/success states.
- Feedback is diegetic: door opens, guard turns, workflow runs, phone unlocks, pendant snaps, card reveals.
- Mobile controls remain reachable and do not sit under the hint drawer.
- Console has no runtime errors.
- No unexpected remote/private image dependency is introduced.

## Current Polish Backlog

Continue chapter-by-chapter detail motion and responsive tuning:

- Chapter 1: wheel lock rotation, note beat highlight, tactile unlock feedback.
- Chapter 2: selected guard lift, marker switching, badge handoff, G success glow.
- Chapter 3: pipeline run, blocked node blink, build success glow.
- Chapter 4: Nokia key press, screen flicker, wrong-code shake, missed call reveal.
- Chapter 5: route progression, timer drain, wrong direction distance feedback, pendant drop.
- Chapter 6: rotate/flip states, slot magnetism, pendant snap, inscription reveal.
- Chapter 7: catalog filters, card completion, archive stamp.
- Chapter 8: moonlight slider, card tilt, hidden ink reveal, final coupon presentation.
