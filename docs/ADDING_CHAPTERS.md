# Adding Chapters And Puzzle Types

Use this note when extending **Chloe in Wonderland**. The goal is to keep new work aligned with the existing storybook archive/object table architecture.

## Add A Chapter

1. Add a record to `src/gameData.ts`.
2. Pick an existing `puzzleType` when possible.
3. Keep story text in `gameData.ts`, but keep interaction logic in a puzzle component.
4. Add hints as a 3 step ladder: light hint, structural hint, close-to-answer hint.
5. Add or update unit tests for the answer.
6. Run the full verification loop from `UI_WORKFLOW.md`.

## Add A Puzzle Type

1. Extend the chapter type in `src/gameData.ts`.
2. Add a dedicated component in `src/puzzles/ChapterPuzzles.tsx`, or split a new file if the component is large.
3. Register the component in `src/PuzzleComponent.tsx`.
4. Add a workbench label in `src/GameShell.tsx`.
5. Add validation rules or aliases in `src/answerValidation.ts` if needed.
6. Add tests in `src/answerValidation.test.ts`.
7. Add visual states and responsive rules in `src/index.css`.

## UX Rules

- The chapter should have a physical-feeling core prop, not a plain form.
- Drag interactions need button alternatives for mobile.
- Failure feedback should be specific and gentle.
- Success feedback should be diegetic: the object should do something in the story.
- Do not use GPT reference images as production backgrounds.

## Visual Review

After a UI change:

```bash
npm run typecheck
npm test
npm run build
npm run ui:screenshots
npm run ui:check
```

If the change intentionally alters screenshots, inspect `docs/ui-review/latest/`, then refresh baselines with:

```bash
npm run ui:baseline
```
