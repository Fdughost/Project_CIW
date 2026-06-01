export type SubmittedAnswer = string | string[];

export interface AnswerValidationOptions {
  aliases?: SubmittedAnswer[];
  caseSensitive?: boolean;
  ordered?: boolean;
}

const normalizeAnswer = (value: string, caseSensitive: boolean) => {
  const normalized = value.normalize("NFKC").trim();
  return caseSensitive ? normalized : normalized.toLocaleLowerCase();
};

const stringAnswersMatch = (
  submittedAnswer: string,
  correctAnswer: string,
  caseSensitive: boolean
) => {
  return (
    normalizeAnswer(submittedAnswer, caseSensitive) ===
    normalizeAnswer(correctAnswer, caseSensitive)
  );
};

const arrayAnswersMatch = (
  submittedAnswer: string[],
  correctAnswer: string[],
  options: Required<Pick<AnswerValidationOptions, "caseSensitive" | "ordered">>
) => {
  if (submittedAnswer.length !== correctAnswer.length) {
    return false;
  }

  const submitted = submittedAnswer.map((answer) =>
    normalizeAnswer(answer, options.caseSensitive)
  );
  const correct = correctAnswer.map((answer) =>
    normalizeAnswer(answer, options.caseSensitive)
  );

  if (options.ordered) {
    return correct.every((answer, index) => submitted[index] === answer);
  }

  const sortedSubmitted = [...submitted].sort();
  const sortedCorrect = [...correct].sort();

  return sortedSubmitted.every((answer, index) => {
    return answer === sortedCorrect[index];
  });
};

const answerMatches = (
  submittedAnswer: SubmittedAnswer,
  correctAnswer: SubmittedAnswer,
  options: Required<Pick<AnswerValidationOptions, "caseSensitive" | "ordered">>
) => {
  if (Array.isArray(correctAnswer)) {
    if (!Array.isArray(submittedAnswer)) {
      return (
        correctAnswer.length === 1 &&
        stringAnswersMatch(
          submittedAnswer,
          correctAnswer[0],
          options.caseSensitive
        )
      );
    }

    return arrayAnswersMatch(submittedAnswer, correctAnswer, options);
  }

  if (Array.isArray(submittedAnswer)) {
    return false;
  }

  return stringAnswersMatch(
    submittedAnswer,
    correctAnswer,
    options.caseSensitive
  );
};

export const validateAnswer = (
  submittedAnswer: SubmittedAnswer,
  correctAnswer: SubmittedAnswer,
  options: AnswerValidationOptions = {}
) => {
  const resolvedOptions = {
    caseSensitive: options.caseSensitive ?? true,
    ordered: options.ordered ?? true,
  };
  const acceptedAnswers = [correctAnswer, ...(options.aliases || [])];

  return acceptedAnswers.some((acceptedAnswer) =>
    answerMatches(submittedAnswer, acceptedAnswer, resolvedOptions)
  );
};
