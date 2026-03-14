# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Chloe in Wonderland** is an interactive text-based puzzle adventure game built as a birthday gift. It features 8 chapters with different puzzle mechanics, telling a romantic story. The game concludes with a special reveal (an Hermès voucher gift).

## Commands

```bash
npm run dev      # Start Vite development server
npm run build    # Production build
npm run preview  # Preview production build
```

No test or lint scripts are configured. TypeScript strict mode provides compile-time checks.

## Architecture

All source files live at the project root (not in `src/`), except assets in `src/assets/`.

**Data flow:** `main.tsx` → `Game.tsx` (state) → `ChapterDisplay.tsx` + `PuzzleComponent.tsx` + `ProgressBar.tsx`

### Key Files

- **`gameData.ts`** — Single source of truth. Defines the `GameChapter` interface and exports the array of 8 chapters with their puzzle type, answer, story text, hints, and per-chapter accent/background colors.
- **`Game.tsx`** — Central state machine. Manages `currentChapter`, game status (`idle | playing | complete`), user answers, and feedback. Contains answer validation and chapter progression logic.
- **`PuzzleComponent.tsx`** — Renders puzzle UI based on `chapter.puzzleType`:
  - `password` — Single text input
  - `choice` — Multiple-choice buttons (A–G)
  - `fill` — Multiple blank inputs
  - `harmonica` — Musical notation password entry
- **`ChapterDisplay.tsx`** — Renders chapter story, title, conditional images, and hints. Applies per-chapter background/accent colors.
- **`ProgressBar.tsx`** — Sticky header with progress bar and chapter indicator circles.
- **`ui.tsx`** — Base `Button` and `Input` components.

### Tech Stack

- React 18 + TypeScript (strict mode)
- Vite + SWC
- TailwindCSS v4 (via `@tailwindcss/postcss`)
- Framer Motion for animations

### Styling Conventions

- Global body gradient (purple → white → yellow) defined in `index.css`
- Per-chapter colors are data-driven via `GameChapter.bgColor` and `GameChapter.accentColor` fields in `gameData.ts`
- Fonts: Georgia (serif for story text), Noto Sans SC (UI/Chinese text)

### Adding or Modifying a Chapter

All chapter content lives in `gameData.ts`. To add or change a chapter, edit the chapters array there — no other files need changing unless a new `puzzleType` is introduced, in which case add a branch in `PuzzleComponent.tsx` and update the `GameChapter` type.
