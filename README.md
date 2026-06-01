# Chloe in Wonderland

> 这是 Alex 写给 Chloe 的生日礼物。
>
> 八章故事、八件道具、一句藏在最后的话。
> 如果你刚好叫 Chloe，那这份礼物是写给你的——请用一个安静的傍晚，从第一章开始翻。

A handmade, interactive birthday storybook. Eight chapters, each with its own playable gadget instead of a generic answer form. Built with React, Vite, TypeScript, and Tailwind, but the only audience that really matters is one.

---

## For Chloe — how to read it

```bash
npm install
npm run dev
```

打开终端显示的地址（通常 `http://127.0.0.1:5173/`），点 **开始冒险**。

每一章会给一个小道具。仔细看，慢慢试，遇到难处右下角有 **Hint**。进度会自动存在浏览器里，关了也能续上。

八章读完，会有一句话从月光里浮出来。那句话是这份礼物真正想说的。

---

## Current Direction

The UI direction is **storybook archive + object table**:

- Desktop uses an asymmetric layout: storybook on the left, chapter gadget on the right.
- Mobile stacks story, gadget, and hints in a stable single column.
- Each chapter has a distinct interaction: harmonica lock, guard logic desk, workflow terminal, Nokia keypad, chase map, pendant merge, library card, and moonlight card.
- GPT reference images in `docs/design/gpt-reference/` are visual baselines only. The real UI is built with HTML/CSS/SVG controls; image assets, when introduced, are registered in `src/assets/chapters/manifest.ts`.

## Scripts

```bash
npm run dev             # Local Vite server
npm run audit           # Dependency vulnerability check
npm run typecheck       # TypeScript check
npm run lint            # ESLint check
npm test                # Vitest unit tests
npm run test:e2e        # Playwright happy-path (requires `npx playwright install chromium` once)
npm run build           # Production build
npm run ui:screenshots  # Capture UI sentinels into docs/ui-review/latest
npm run ui:baseline     # Refresh intentional visual baselines
npm run ui:check        # Compare latest screenshots with baseline
```

`dist/` and transient screenshot folders (`docs/ui-review/latest/`, `docs/ui-review/diff/`) are gitignored.

## Architecture

```text
src/main.tsx
  -> src/Game.tsx                  # game phase, chapter progression, feedback, first chapter music
    -> src/GameShell.tsx           # persistent HUD + storybook panel + object workbench + back arrow
      -> src/ChapterDisplay.tsx    # chapter story body
      -> src/PuzzleComponent.tsx   # dispatches puzzleType to per-chapter modules
        -> src/puzzles/chapter-{1..8}.tsx   # one file per chapter
        -> src/puzzles/_shared.ts           # PuzzleProps + optionButtonClass
        -> src/puzzles/chapter-1-art.tsx    # inline SVG illustrations for Ch1 props
```

Cross-cutting modules:

- `src/gameData.ts` — chapter records (story, puzzle type, answer, hints, validation).
- `src/answerValidation.ts` — answer normalization + comparison.
- `src/gameProgress.ts` — localStorage save/resume.
- `src/assets/chapters/manifest.ts` — `SafeArea` / `ChapterAsset` / `ChapterAssetSet` types, with per-chapter asset folders under `src/assets/chapters/chapter-N/`.
- `src/index.css` — design tokens, chrome layout, per-chapter gadget styling, responsive + reduced-motion rules.

Legacy root-level files and duplicated assets are archived under `docs/archive/legacy-root/`. The running app source of truth is `src/`.

## UI Workflow

Before changing UI, read in this order:

- `planC.md` — active iteration plan (asset budget, lazy loading, 5-layer architecture, Round 0/1 deliverables).
- `CIW_GPT_VISUAL_BASELINE.md` — selected reference direction.
- `UI_RULES.md` — tokens, typography, controls, mobile rules, do-not list.
- `UI_WORKFLOW.md` — verification commands per change type.
- `docs/design/asset-zones.md` — per-chapter image-vs-DOM breakdown with `safeArea` suggestions.
- `docs/design/asset-prompts.md` — AI image generation prompts.
- `CLAUDE.md` / `AGENTS.md` — agent instructions.

After meaningful UI changes, run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run ui:screenshots
npm run ui:check       # when a baseline exists
npm run test:e2e       # for behavior-sensitive changes
```

Screenshots cover intro + 8 chapters at desktop `1440x900`, tablet `768x900`, mobile `375x812`. Baselines live in `docs/ui-review/baseline/`; latest and diff outputs are generated locally and ignored.

---

## ⚠️ Spoilers — chapter answers (for development only)

> 如果你是 Chloe 还没玩过，**就到这里为止**。下面是答案，会破坏惊喜。

<details>
<summary>展开看答案</summary>

- Chapter 1: `7564`
- Chapter 2: `G`
- Chapter 3: `workflow-complete`
- Chapter 4: `5683`
- Chapter 5: `right`, `left`, `forward`, `right`, `left`
- Chapter 6: `pendant-complete`
- Chapter 7: `8`, `所有`
- Chapter 8: `余光是你`, `余生也是你`

Do not change these unless the puzzle logic and visible clues are updated together.

</details>
