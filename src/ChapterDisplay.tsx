/**
 * 故事文本组件
 * 外层书页、提示抽屉和道具桌由 GameShell 统一提供。
 */

import { motion } from "framer-motion";
import type { GameChapter } from "./gameData";

interface ChapterDisplayProps {
  chapter: GameChapter;
}

export default function ChapterDisplay({ chapter }: ChapterDisplayProps) {
  return (
    <motion.div
      key={chapter.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="ciw-story-content"
    >
      <div className="whitespace-pre-wrap">{chapter.story}</div>
    </motion.div>
  );
}
