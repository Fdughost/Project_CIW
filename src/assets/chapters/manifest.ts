import plateUrl from "./chapter-1/plate.webp";
import harmonicaUrl from "./chapter-1/harmonica.webp";
import scorePaperUrl from "./chapter-1/score-paper.webp";
import doorLockShellUrl from "./chapter-1/door-lock-shell.webp";
import cabinNoteUrl from "./chapter-1/cabin-note.webp";

export interface SafeArea {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ChapterAsset {
  src: string;
  alt: string;
  role: "plate" | "propShell" | "texture" | "overlay";
  safeAreas?: SafeArea[];
}

export interface ChapterAssetSet {
  chapterId: number;
  plate?: ChapterAsset;
  propShells: ChapterAsset[];
  textures?: ChapterAsset[];
  overlays?: ChapterAsset[];
}

const chapter1: ChapterAssetSet = {
  chapterId: 1,
  plate: {
    src: plateUrl,
    alt: "壁炉旁的木桌，油灯与玫瑰花瓣点缀",
    role: "plate",
  },
  propShells: [
    {
      src: harmonicaUrl,
      alt: "黄铜口琴",
      role: "propShell",
    },
    {
      src: scorePaperUrl,
      alt: "口琴乐谱泛黄手稿",
      role: "propShell",
      safeAreas: [{ name: "notes", x: 6, y: 22, width: 88, height: 70 }],
    },
    {
      src: doorLockShellUrl,
      alt: "木门上的黄铜机械锁",
      role: "propShell",
      safeAreas: [
        { name: "wheel-1", x: 28, y: 44, width: 11, height: 18 },
        { name: "wheel-2", x: 41, y: 44, width: 11, height: 18 },
        { name: "wheel-3", x: 54, y: 44, width: 11, height: 18 },
        { name: "wheel-4", x: 67, y: 44, width: 11, height: 18 },
      ],
    },
    {
      src: cabinNoteUrl,
      alt: "桌上的手写小卡片",
      role: "propShell",
      safeAreas: [{ name: "message", x: 14, y: 22, width: 72, height: 56 }],
    },
  ],
};

const emptySet = (id: number): ChapterAssetSet => ({
  chapterId: id,
  propShells: [],
});

export const chapterAssets: Record<number, ChapterAssetSet> = {
  1: chapter1,
  2: emptySet(2),
  3: emptySet(3),
  4: emptySet(4),
  5: emptySet(5),
  6: emptySet(6),
  7: emptySet(7),
  8: emptySet(8),
};

export function getChapterAssets(chapterId: number): ChapterAssetSet {
  return chapterAssets[chapterId] ?? emptySet(chapterId);
}

export function getSafeArea(
  asset: ChapterAsset,
  name: string,
): SafeArea | undefined {
  return asset.safeAreas?.find((area) => area.name === name);
}

export const chapter1Assets = {
  plate: plateUrl,
  harmonica: harmonicaUrl,
  scorePaper: scorePaperUrl,
  doorLockShell: doorLockShellUrl,
  cabinNote: cabinNoteUrl,
};
