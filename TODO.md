# Chloe in Wonderland TODO

## P0 - Project Hygiene

- [x] Make `src/` the single source of truth for the app.
- [x] Remove or archive duplicated root-level React files once `src/` is confirmed complete.
- [x] Stop tracking generated `dist/` output unless there is a deployment reason to keep it.
- [x] Consolidate duplicated assets under one location, preferably `src/assets/` for imported assets and `public/` only for true public-path files.
- [x] Update `CLAUDE.md` and `README.md` so they describe the current `src/main.tsx -> Game.tsx` app structure accurately.

## P1 - Core Gameplay

- [x] Replace the placeholder chapter 5 password puzzle with the intended direction-chase or maze interaction.
- [x] Replace the placeholder chapter 6 password puzzle with a pendant-combination interaction.
- [x] Replace the placeholder chapter 3 password puzzle with workflow ordering and role assignment.
- [x] Turn chapter 4 into a Nokia keypad puzzle instead of a plain text input.
- [x] Make chapter 1 more tactile with clickable harmonica notes or an interactive hint around the music score.
- [x] Make chapter 2 choices feel like guard cards, including visible statements and selected-state feedback.
- [x] Turn chapter 7 into a library-card and directory-cabinet search interaction.
- [x] Add a reveal-style interaction for chapter 8 so the final answer feels discovered rather than typed into a generic form.

## P1 - Answer Validation

- [x] Extract answer checking from `Game.tsx` into a dedicated `validateAnswer` helper.
- [x] Avoid mutating stored answers during validation.
- [x] Preserve answer order for ordered fill-in puzzles.
- [x] Normalize user input with trimming and optional full-width/half-width conversion.
- [x] Support per-chapter validation options such as aliases, case sensitivity, and ordered vs unordered answers.
- [x] Add friendly wrong-answer feedback that can vary by chapter.

## P2 - Game State And UX

- [x] Replace `gameStarted` and `gameCompleted` booleans with a clearer game phase such as `intro | playing | complete`.
- [x] Remove unused `userAnswer` state.
- [x] Clean up delayed chapter transitions so restart or rapid interactions cannot trigger stale `setTimeout` behavior.
- [x] Add local progress saving and a continue/reset choice on return.
- [x] Gate hints behind a "view hint" action instead of showing every hint immediately.
- [x] Track hint usage and failed attempts for better feedback or optional scoring.

## P2 - Visual Design

- [x] Move desktop gameplay toward the intended asymmetric layout: story on one side, puzzle on the other.
- [x] Keep mobile as a clean stacked layout with stable spacing and no cramped controls.
- [x] Replace remote private image URLs in the intro and ending with local assets.
- [x] Build a consistent design token layer for colors, spacing, radius, shadows, and typography.
- [x] Add chapter-specific visual motifs so each chapter feels distinct without becoming visually noisy.
- [x] Make success and error states more animated and emotionally warm.

## P3 - Engineering Quality

- [x] Add `typecheck` and test scripts to `package.json`.
- [x] Add an audit script and clear current npm audit vulnerabilities.
- [x] Add a lint script to `package.json`.
- [x] Add unit tests for answer validation, fill-in order, and core chapter answers.
- [x] Add alias-specific answer validation tests after alias support exists.
- [x] Add a lightweight end-to-end happy-path test through all chapters.
- [x] Split `PuzzleComponent` into dedicated puzzle components as new mechanics are added.
- [x] Define `GameChapter` as a discriminated union so each puzzle type has the right fields.
- [x] Add a short contributor note for adding new chapters and puzzle types.
