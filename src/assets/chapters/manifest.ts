import scorePaperUrl from "./chapter-1/score-paper.png";

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
  propShells: [
    {
      src: scorePaperUrl,
      alt: "口琴乐谱泛黄手稿",
      role: "propShell",
      safeAreas: [
        { name: "notes", x: 8, y: 20, width: 84, height: 60 },
      ],
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
