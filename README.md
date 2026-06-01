# Chloe in Wonderland

An interactive storybook puzzle game built with React, Vite, TypeScript, and Tailwind. The game keeps an 8 chapter romantic birthday story, but each chapter now has its own playable gadget instead of a generic answer form.

## Current Direction

The UI direction is **storybook archive + object table**:

- Desktop uses an asymmetric layout: story on the left, chapter gadget on the right.
- Mobile stacks story, gadget, and hints in a stable single column.
- Each chapter has a distinct interaction: harmonica lock, guard logic desk, workflow terminal, Nokia keypad, chase map, pendant merge, library card, and moonlight card.
- GPT reference images are visual baselines only. The real UI is built with HTML/CSS controls.

## Getting Started

```bash
npm install
npm run dev
```

The app runs at the Vite URL shown in the terminal, usually `http://127.0.0.1:5173/`.

## Scripts

```bash
npm run dev             # Start local Vite server
npm run audit           # Check dependency vulnerabilities
npm run typecheck       # TypeScript check
npm run lint            # ESLint check
npm test                # Unit tests
npm run test:e2e        # Playwright happy-path test
npm run build           # Production build
npm run ui:screenshots  # Capture UI review screenshots
npm run ui:baseline     # Generate baseline screenshots
npm run ui:check        # Compare latest screenshots with baseline
```

`dist/` is generated output and is intentionally ignored.

## Architecture

```text
src/main.tsx
  -> src/Game.tsx
    -> src/GameShell.tsx
      -> src/ChapterDisplay.tsx
      -> src/PuzzleComponent.tsx
        -> src/puzzles/ChapterPuzzles.tsx
```

Important files:

- `src/gameData.ts` defines the chapter data.
- `src/answerValidation.ts` validates submitted answers.
- `src/gameProgress.ts` saves local progress.
- `src/Game.tsx` manages game phase, chapter progression, feedback, and first chapter music.
- `src/GameShell.tsx` renders the persistent HUD, storybook panel, object workbench, and hint bar.
- `src/puzzles/ChapterPuzzles.tsx` contains the chapter-specific gadget components.
- `src/index.css` contains design tokens, layout, responsive rules, and animation states.

Legacy root-level source files and duplicated root assets are archived in `docs/archive/legacy-root/`. The running app source of truth is `src/`.

## UI Workflow

Before changing UI, read:

- `CIW_GPT_VISUAL_BASELINE.md`
- `UI_RULES.md`
- `UI_WORKFLOW.md`
- `CLAUDE.md` or `AGENTS.md`

After meaningful UI changes, run:

```bash
npm run typecheck
npm test
npm run build
npm run ui:screenshots
npm run ui:check
```

Screenshots are captured for intro and all 8 chapters at desktop, tablet, and mobile sizes. Baselines live in `docs/ui-review/baseline/`; latest and diff outputs are generated locally and ignored.

## Chapter Answers

- Chapter 1: `7564`
- Chapter 2: `G`
- Chapter 3: `workflow-complete`
- Chapter 4: `5683`
- Chapter 5: `right`, `left`, `forward`, `right`, `left`
- Chapter 6: `pendant-complete`
- Chapter 7: `8`, `所有`
- Chapter 8: `余光是你`, `余生也是你`

Do not change these unless the puzzle logic and visible clues are updated together.
