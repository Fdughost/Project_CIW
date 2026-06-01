/**
 * 谜题组件
 * 根据章节类型分发到各自的互动玩法
 */

import type { GameChapter } from "./gameData";
import { HarmonicaLockPuzzle } from "./puzzles/chapter-1";
import { GuardLogicPuzzle } from "./puzzles/chapter-2";
import { WorkflowRepairPuzzle } from "./puzzles/chapter-3";
import { NokiaKeypadPuzzle } from "./puzzles/chapter-4";
import { ChasePathPuzzle } from "./puzzles/chapter-5";
import { PendantMergePuzzle } from "./puzzles/chapter-6";
import { LibraryCardPuzzle } from "./puzzles/chapter-7";
import { CardRevealPuzzle } from "./puzzles/chapter-8";
import type { SubmittedAnswer } from "./answerValidation";

interface PuzzleComponentProps {
  chapter: GameChapter;
  onSubmit: (answer: SubmittedAnswer) => void;
  feedback: {
    type: "success" | "error" | null;
    message: string;
  };
}

export default function PuzzleComponent({
  chapter,
  onSubmit,
  feedback: _feedback,
}: PuzzleComponentProps) {
  const renderPuzzle = () => {
    switch (chapter.puzzleType) {
      case "harmonicaLock":
        return <HarmonicaLockPuzzle onSubmit={onSubmit} />;
      case "guardLogic":
        return <GuardLogicPuzzle onSubmit={onSubmit} />;
      case "workflowRepair":
        return <WorkflowRepairPuzzle onSubmit={onSubmit} />;
      case "nokiaKeypad":
        return <NokiaKeypadPuzzle onSubmit={onSubmit} />;
      case "chasePath":
        return <ChasePathPuzzle onSubmit={onSubmit} />;
      case "pendantMerge":
        return <PendantMergePuzzle onSubmit={onSubmit} />;
      case "libraryCard":
        return <LibraryCardPuzzle onSubmit={onSubmit} />;
      case "cardReveal":
        return <CardRevealPuzzle onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  return <>{renderPuzzle()}</>;
}
