/**
 * 进度条组件
 * 梦幻童话风格：显示游戏进度
 */

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-purple-700">
            进度: 第 {current} 关 / 共 {total} 关
          </h3>
          <span className="text-xs text-gray-500">
            {Math.round(progress)}%
          </span>
        </div>

        {/* 进度条背景 */}
        <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
          {/* 进度条填充 */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          />
        </div>

        {/* 章节指示器 */}
        <div className="flex justify-between mt-4">
          {Array.from({ length: total }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: index + 1 <= current ? 1 : 0.8,
                opacity: index + 1 <= current ? 1 : 0.5,
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                index + 1 <= current
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              {index + 1}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

