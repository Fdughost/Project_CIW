/**
 * 谜题组件
 * 梦幻童话风格：处理密码、选择、填空等不同类型的谜题
 */

import { useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { Button, Input } from "./ui";
import type { GameChapter } from "./gameData";

interface PuzzleComponentProps {
  chapter: GameChapter;
  onSubmit: (answer: string | string[]) => void;
  feedback: {
    type: "success" | "error" | null;
    message: string;
  };
}

export default function PuzzleComponent({
  chapter,
  onSubmit,
  feedback,
}: PuzzleComponentProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [fillAnswers, setFillAnswers] = useState<string[]>([]);

  const handlePasswordSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  const handleChoiceSubmit = () => {
    if (selectedChoice) {
      onSubmit(selectedChoice);
      setSelectedChoice(null);
    }
  };

  const handleFillSubmit = () => {
    if (fillAnswers.length > 0) {
      onSubmit(fillAnswers);
      setFillAnswers([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (chapter.puzzleType === "password") {
        handlePasswordSubmit();
      }
    }
  };

  const feedbackVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8 border border-purple-100"
    >
      {/* 谜题问题 */}
      <h3 className="text-xl font-semibold text-purple-700 mb-6">
        {chapter.puzzleQuestion}
      </h3>

      {/* 反馈信息 */}
      {feedback.type && (
        <motion.div
          variants={feedbackVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`mb-6 p-4 rounded-lg font-semibold text-center ${
            feedback.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {feedback.message}
        </motion.div>
      )}

      {/* 密码输入谜题 */}
      {chapter.puzzleType === "password" && (
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="请输入密码..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500"
          />
          <Button
            onClick={handlePasswordSubmit}
            disabled={!inputValue.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold"
          >
            提交答案
          </Button>
        </div>
      )}

      {/* 选择谜题 */}
      {chapter.puzzleType === "choice" && (
        <div className="space-y-3">
          {["A", "B", "C", "D", "E", "F", "G"].map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedChoice(option)}
              className={`w-full p-4 rounded-lg font-semibold text-left transition-all border-2 ${
                selectedChoice === option
                  ? "bg-purple-500 text-white border-purple-600"
                  : "bg-white text-gray-700 border-purple-200 hover:border-purple-400"
              }`}
            >
              {option}
            </motion.button>
          ))}
          <Button
            onClick={handleChoiceSubmit}
            disabled={!selectedChoice}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold mt-4"
          >
            提交答案
          </Button>
        </div>
      )}

      {/* 填空谜题 */}
      {chapter.puzzleType === "fill" && (
        <div className="space-y-4">
          <div className="space-y-3">
            {Array(
              Array.isArray(chapter.answer) ? chapter.answer.length : 1
            )
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    答案 {index + 1}
                  </label>
                  <Input
                    type="text"
                    placeholder={`请输入第 ${index + 1} 个答案...`}
                    value={fillAnswers[index] || ""}
                    onChange={(e) => {
                      const newAnswers = [...fillAnswers];
                      newAnswers[index] = e.target.value;
                      setFillAnswers(newAnswers);
                    }}
                    className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500"
                  />
                </div>
              ))}
          </div>
          <Button
            onClick={handleFillSubmit}
            disabled={
              fillAnswers.length === 0 ||
              fillAnswers.some((ans) => !ans.trim())
            }
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold"
          >
            提交答案
          </Button>
        </div>
      )}

      {/* 口琴谜题 */}
      {chapter.puzzleType === "harmonica" && (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">口琴简谱：</p>
            <p className="font-mono text-lg text-purple-700">
              ｜ 1 7 13 7 5｜6_ 6 1 _ | 4_ 4 1 7 5 | 67 3 2 |
            </p>
          </div>
          <Input
            type="text"
            placeholder="请输入四位密码..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500"
          />
          <Button
            onClick={handlePasswordSubmit}
            disabled={!inputValue.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold"
          >
            提交答案
          </Button>
        </div>
      )}
    </motion.div>
  );
}

