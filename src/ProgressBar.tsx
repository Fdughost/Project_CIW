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
  const clueItems = [
    "口琴",
    "金币",
    "手机",
    "来电",
    "挂饰",
    "借阅卡",
    "所有",
    "卡片",
  ];

  return (
    <div className="ciw-hud sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="ciw-kicker">Chloe in Wonderland</p>
            <h3 className="text-sm font-bold text-slate-800">
              Chapter {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </h3>
          </div>
          <div className="min-w-36 text-right">
            <span className="text-xs font-semibold text-slate-500">
              旅程完成度 {Math.round(progress)}%
            </span>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-teal-600 via-amber-400 to-rose-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className={`rounded-xl border px-2 py-2 transition ${
                index + 1 === current
                  ? "border-amber-300 bg-amber-50"
                  : index + 1 < current
                    ? "border-teal-100 bg-teal-50"
                    : "border-slate-200 bg-white/70"
              }`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: index + 1 <= current ? 1 : 0.8,
                  opacity: index + 1 <= current ? 1 : 0.5,
                }}
                className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                  index + 1 <= current
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {index + 1}
              </motion.div>
              <span
                className={`block truncate text-[10px] font-semibold ${
                  index + 1 < current
                    ? "text-teal-700"
                    : index + 1 === current
                      ? "text-amber-700"
                      : "text-slate-400"
                }`}
              >
                {index + 1 < current
                  ? clueItems[index]
                  : index + 1 === current
                    ? "当前道具"
                    : clueItems[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
