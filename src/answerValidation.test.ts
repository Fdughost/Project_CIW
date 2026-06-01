import { describe, expect, it } from "vitest";
import { validateAnswer } from "./answerValidation";
import { chapters } from "./gameData";

const chapterAnswer = (chapterId: number) => {
  const chapter = chapters.find((item) => item.id === chapterId);
  if (!chapter) {
    throw new Error(`Missing chapter ${chapterId}`);
  }
  return chapter.answer;
};

const chapterValidation = (chapterId: number) => {
  const chapter = chapters.find((item) => item.id === chapterId);
  if (!chapter) {
    throw new Error(`Missing chapter ${chapterId}`);
  }
  return chapter.validation;
};

const guardTruthCount = (goldBehind: string) => {
  const statements = [
    goldBehind === "A" || goldBehind === "B",
    goldBehind === "C" || goldBehind === "D",
    goldBehind === "E" || goldBehind === "F",
    goldBehind !== "G",
    goldBehind === "B" || goldBehind === "E",
    goldBehind === "A" || goldBehind === "C",
    goldBehind === "G",
  ];

  return statements.filter(Boolean).length;
};

describe("validateAnswer", () => {
  it("accepts the current chapter 1 code 7564 and rejects the old document code", () => {
    expect(validateAnswer("7564", chapterAnswer(1))).toBe(true);
    expect(validateAnswer(" ７５６４ ", chapterAnswer(1))).toBe(true);
    expect(validateAnswer("5564", chapterAnswer(1))).toBe(false);
  });

  it("keeps chapter 2 as a uniquely solvable G guard puzzle", () => {
    const candidates = ["A", "B", "C", "D", "E", "F", "G"];
    const uniqueTruthCandidates = candidates.filter((candidate) => {
      return guardTruthCount(candidate) === 1;
    });

    expect(uniqueTruthCandidates).toEqual(["G"]);
    expect(validateAnswer("G", chapterAnswer(2), chapterValidation(2))).toBe(
      true
    );
    expect(validateAnswer("A", chapterAnswer(2), chapterValidation(2))).toBe(
      false
    );
  });

  it("supports per-chapter aliases and case sensitivity options", () => {
    expect(validateAnswer("g", chapterAnswer(2), chapterValidation(2))).toBe(
      true
    );
    expect(validateAnswer("guard-g", chapterAnswer(2), chapterValidation(2))).toBe(
      false
    );
  });

  it("validates the Nokia keypad answer", () => {
    expect(validateAnswer("5683", chapterAnswer(4))).toBe(true);
    expect(validateAnswer("LOVE", chapterAnswer(4))).toBe(false);
  });

  it("requires ordered fill-in answers for chapter 7", () => {
    expect(validateAnswer(["8", "所有"], chapterAnswer(7))).toBe(true);
    expect(validateAnswer(["所有", "8"], chapterAnswer(7))).toBe(false);
  });

  it("requires ordered fill-in answers for chapter 8", () => {
    expect(validateAnswer(["余光是你", "余生也是你"], chapterAnswer(8))).toBe(
      true
    );
    expect(validateAnswer(["余生也是你", "余光是你"], chapterAnswer(8))).toBe(
      false
    );
  });

  it("can compare unordered multi-part answers when configured", () => {
    expect(
      validateAnswer(["B", "A"], ["A", "B"], {
        ordered: false,
      })
    ).toBe(true);
  });
});
