const GAME_PROGRESS_STORAGE_KEY = "chloe-in-wonderland:progress:v1";

export interface SavedGameProgress {
  chapterIndex: number;
  hintUsage: Record<number, number>;
  failedAttempts: Record<number, number>;
  savedAt: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const normalizeNumberRecord = (value: unknown) => {
  if (!isRecord(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value)
      .map(([key, recordValue]) => [Number(key), Number(recordValue)])
      .filter(([key, recordValue]) => {
        return Number.isFinite(key) && Number.isFinite(recordValue);
      })
  ) as Record<number, number>;
};

export const loadGameProgress = (
  totalChapters: number
): SavedGameProgress | null => {
  try {
    const rawProgress = window.localStorage.getItem(GAME_PROGRESS_STORAGE_KEY);
    if (!rawProgress) {
      return null;
    }

    const parsedProgress: unknown = JSON.parse(rawProgress);
    if (!isRecord(parsedProgress)) {
      return null;
    }

    const chapterIndex = Number(parsedProgress.chapterIndex);
    if (
      !Number.isInteger(chapterIndex) ||
      chapterIndex < 0 ||
      chapterIndex >= totalChapters
    ) {
      return null;
    }

    const savedAt =
      typeof parsedProgress.savedAt === "string"
        ? parsedProgress.savedAt
        : new Date().toISOString();

    return {
      chapterIndex,
      hintUsage: normalizeNumberRecord(parsedProgress.hintUsage),
      failedAttempts: normalizeNumberRecord(parsedProgress.failedAttempts),
      savedAt,
    };
  } catch {
    return null;
  }
};

export const saveGameProgress = (progress: SavedGameProgress) => {
  window.localStorage.setItem(
    GAME_PROGRESS_STORAGE_KEY,
    JSON.stringify(progress)
  );
};

export const clearGameProgress = () => {
  window.localStorage.removeItem(GAME_PROGRESS_STORAGE_KEY);
};
