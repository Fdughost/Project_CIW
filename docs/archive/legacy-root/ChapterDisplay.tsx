/**
 * 章节显示组件
 * 梦幻童话风格：展示故事内容和背景
 */

import { motion } from "framer-motion";
import type { GameChapter } from "./gameData";
import musicScoreImg from "./assets/music-score.png";
import nokiaImg from "./assets/nokia.png";

interface ChapterDisplayProps {
  chapter: GameChapter;
}

export default function ChapterDisplay({ chapter }: ChapterDisplayProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-gradient-to-br ${chapter.backgroundColor} rounded-2xl shadow-xl p-8 md:p-12 border border-white/30 backdrop-blur-sm`}
    >
      {/* 章节标题 */}
      <motion.h2
        variants={itemVariants}
        className={`text-3xl md:text-4xl font-bold mb-6 ${chapter.accentColor}`}
        style={{ fontFamily: "Georgia, serif" }}
      >
        {chapter.title}
      </motion.h2>

      {/* 装饰线 */}
      <motion.div
        variants={itemVariants}
        className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-6"
      />

      {/* 故事内容 */}
      <motion.div
        variants={itemVariants}
        className="prose prose-sm md:prose-base max-w-none"
      >
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
          {chapter.story}
        </div>
      </motion.div>

      {/* 章节图片（第一章乐谱、第四章诺基亚等，用 import 保证路径正确） */}
      {(chapter.imageUrl || chapter.id === 1 || chapter.id === 4) && (
        <motion.div
          variants={itemVariants}
          className="mt-6 flex justify-center"
        >
          <img
            src={
              chapter.id === 1
                ? musicScoreImg
                : chapter.id === 4
                  ? nokiaImg
                  : chapter.imageUrl!
            }
            alt={chapter.id === 1 ? "口琴简谱" : chapter.id === 4 ? "诺基亚手机" : "章节图片"}
            className="max-w-full h-auto rounded-lg shadow-lg border border-white/50"
            style={{ maxHeight: "600px" }}
          />
        </motion.div>
      )}

      {/* 提示信息 */}
      {chapter.hint && (
        <motion.div
          variants={itemVariants}
          className="mt-8 p-4 bg-white/50 rounded-lg border-l-4 border-purple-400"
        >
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-purple-600">💡 提示：</span>
            {" " + chapter.hint}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

