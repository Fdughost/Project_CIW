# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This repository is the current React implementation of **Chloe in Wonderland**, an 8 chapter birthday story game. Treat it as a small interactive storybook with chapter-specific gadgets, not as a generic form-based quiz.

## Required Commands

```bash
npm run dev             # Vite dev server (http://127.0.0.1:5173/)
npm run audit           # Dependency vulnerability check
npm run typecheck       # TypeScript check
npm run lint            # ESLint check
npm test                # Vitest unit tests (src/**/*.test.ts)
npm run test:e2e        # Playwright happy-path test (requires `npx playwright install chromium` once)
npm run build           # Production build
npm run ui:screenshots  # Capture visual sentinels into docs/ui-review/latest
npm run ui:baseline     # Refresh intentional visual baselines
npm run ui:check        # Compare latest screenshots against baseline (1.5% diff threshold)
```

To run a single unit test: `npx vitest run src/answerValidation.test.ts`.

After frontend or visual changes run at least `typecheck`, `lint`, `test`, `build`, and `ui:screenshots`. Run `test:e2e` for behavior-sensitive changes (answer validation, chapter switching, progress persistence, hint flow, success events). Run `ui:check` when a baseline exists. Only update the baseline when the visual change is intentional and reviewed.

## Architecture

Source code lives in `src/`.

```text
src/main.tsx
  -> src/Game.tsx                  # phase / progression / feedback / first chapter music / persistence
    -> src/GameShell.tsx           # persistent HUD + storybook panel + object workbench + page back arrow
      -> src/ChapterDisplay.tsx    # animated chapter story body
      -> src/PuzzleComponent.tsx   # dispatches puzzleType to per-chapter modules
        -> src/puzzles/chapter-{1..8}.tsx   # one file per chapter; export the puzzle component
        -> src/puzzles/_shared.ts           # PuzzleProps + optionButtonClass shared by all chapters
        -> src/puzzles/chapter-1-art.tsx    # inline SVG illustrations for Ch1 props (harmonica/score/door+lock)
```

Cross-cutting modules:

- `src/gameData.ts` — 8 chapter records: puzzle type, answer, story, hints, validation options.
- `src/answerValidation.ts` — answer normalization + comparison rules.
- `src/gameProgress.ts` — localStorage save/resume under key `chloe-in-wonderland:progress:v1`.
- `src/index.css` — design tokens, layout shell, chrome (HUD/book/brass plaques), per-chapter gadget styling, responsive rules, reduced-motion fallbacks.
- `src/assets/chapters/manifest.ts` — `SafeArea` / `ChapterAsset` / `ChapterAssetSet` types and `chapterAssets[]` registry; per-chapter image assets live under `src/assets/chapters/chapter-N/`.

The eight puzzle types (registered in `gameData.ts` and dispatched in `PuzzleComponent.tsx`):
`harmonicaLock`, `guardLogic`, `workflowRepair`, `nokiaKeypad`, `chasePath`, `pendantMerge`, `libraryCard`, `cardReveal`.

## Design Contract

Before changing UI, read:

- `planC.md` — the active iteration plan (asset budget, lazy-loading, 5-layer architecture, multi-agent roles, Round 0/1 deliverables).
- `CIW_GPT_VISUAL_BASELINE.md` — selected GPT reference direction.
- `UI_RULES.md` — tokens, typography, controls, mobile rules, do-not list (44px touch targets, no full-bleed AI bg, no decorative orbs).
- `UI_WORKFLOW.md` — verification commands per change type and screenshot sentinels.
- `docs/design/asset-zones.md` — per-chapter breakdown of what is image asset vs DOM control, including `safeArea` suggestions.
- `docs/design/asset-prompts.md` — AI image generation prompts (chrome + Ch1 done; later chapters pending).

The product direction is a **storybook archive + object table**. Desktop uses an asymmetric two-panel layout: story on the left, chapter gadget on the right. Mobile stacks clearly and keeps all controls reachable. Each chapter needs a distinct core prop and physical feedback; HUD and command bar stay consistent across chapters.

Per puzzle, organize JSX with the 5-layer CSS class convention (scope = inside `ObjectWorkbench` only, do not rewrite shell): `ciw-layer-scene` / `ciw-layer-prop` / `ciw-layer-dom` / `ciw-layer-fx` / `ciw-layer-success`. The first, second, fourth must be `aria-hidden`; all accessible/interactive content lives in `ciw-layer-dom`.

Do not turn the page back into one repeated white-card form. Avoid new colors, shadows, radii, and font sizes unless they are added to the tokens/rules first.

## Chapter Invariants

- Chapter 1 answer is `7564`. The older planning note that said `5564` is wrong.
- Chapter 2 answer is `G` with the revised guard logic.
- Chapter 4 answer is `5683`.
- Chapter 7 requires ordered blanks: `8`, `所有`.
- Chapter 8 requires ordered phrases: `余光是你`, `余生也是你`.

Keep these answers stable unless the user explicitly asks to redesign the puzzle logic. If you change a chapter's title, also update the matching `waitFor` text in `scripts/ui-screenshots.mjs` — the screenshot script keys off chapter titles to know when each sentinel page is ready.

## UI Work Protocol

1. Inspect existing components, tokens, and the visual baseline.
2. Make the smallest coherent UI change that improves the current object/gadget experience.
3. Preserve keyboard and touch paths. Drag interactions need button alternatives.
4. Capture screenshots at desktop `1440x900`, tablet `768x900`, and mobile `375x812`.
5. Review screenshots for hierarchy, spacing, overflow, text clipping, visual drift, and broken interaction states.
6. Fix issues before reporting completion.

When in doubt, keep animations restrained and tactile: press, glow, shake, pulse, snap, reveal. Respect `prefers-reduced-motion`. The goal is romantic, polished, and playable, not flashy.
