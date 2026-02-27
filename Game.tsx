/**
 * 游戏主页面
 * 梦幻童话风格：柔和的紫罗兰色与暖金色，流畅的过渡动画
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui";
import { chapters, getTotalChapters } from "./gameData";
import ChapterDisplay from "./ChapterDisplay";
import PuzzleComponent from "./PuzzleComponent";
import ProgressBar from "./ProgressBar";
import voucherImg from "./assets/voucher2.png";

export default function Game() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const chapter = chapters[currentChapter];
  const totalChapters = getTotalChapters();

  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentChapter(0);
  };

  const handleSubmitAnswer = (answer: string | string[]) => {
    const correctAnswer = chapter.answer;
    let isCorrect = false;

    if (Array.isArray(correctAnswer)) {
      isCorrect = Array.isArray(answer)
        ? JSON.stringify(answer.sort()) ===
          JSON.stringify(correctAnswer.sort())
        : answer === correctAnswer[0];
    } else {
      isCorrect = answer === correctAnswer;
    }

    if (isCorrect) {
      setFeedback({
        type: "success",
        message: "✨ 正确！恭喜你解开了这个谜题！",
      });

      setTimeout(() => {
        if (currentChapter < totalChapters - 1) {
          setCurrentChapter(currentChapter + 1);
          setUserAnswer("");
          setFeedback({ type: null, message: "" });
        } else {
          setGameCompleted(true);
        }
      }, 1500);
    } else {
      setFeedback({
        type: "error",
        message: "✗ 答案不对，请再试一次。",
      });
      setUserAnswer("");
    }
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentChapter(0);
    setUserAnswer("");
    setFeedback({ type: null, message: "" });
  };

  if (!gameStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-yellow-50 flex items-center justify-center p-4"
      >
        <div className="text-center max-w-2xl">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-purple-700 mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Chloe in Wonderland
          </motion.h1>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/ZDFKOWnP5x8w4B3KNFOr54/sandbox/GrbzY9X7l1ucPd9sMiBiTq-img-1_1771418841000_na1fn_aGVyby13b25kZXJsYW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWkRGS09XblA1eDh3NEIzS05GT3I1NC9zYW5kYm94L0dyYnpZOVg3bDF1Y1BkOXNNaUJpVHEtaW1nLTFfMTc3MTQxODg0MTAwMF9uYTFmbl9hR1Z5YnkxM2IyNWtaWEpzWVc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=njJIxLcqOdBjT11wM-MZh6TMWMNY0JVdrboX2cL6Y9Rgbe7yW6nW4YNaRXjE0Fata8BJZXl3nbnXWtEZFnglWPpidbAkBq1yPWzt3IGqxV6mY4Hvr24XY6muyqiKufrst616PuALqwlExEse9bwJ26f2OzCyfNzi4s6IsjrMgbU7SefwjoalPmYyRqLH7cj8WkZDvqyTNaM7nCCiTyAKGlv9Wj5P48NihDT~bU6UTs8tMifZeJQmCd1MFbUoJ~gzWFGrbciq0lQ2PYVHAUKlYpb8ZMtKeALPy4~VBxLZzVkzo8vl4qVw7Y7pHyzW4EQF0ClLYKugV5V-RCEgyDACQw__"
              alt="Wonderland"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            亲爱的 Chloe，你面前有一杯被施了魔法的药水，它将带你进入一个奇妙的仙境世界。准备好了，就喝下它，开始你的冒险吧。
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={handleStartGame}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              开始冒险
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (gameCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center p-4"
      >
        <div className="text-center max-w-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/ZDFKOWnP5x8w4B3KNFOr54/sandbox/GrbzY9X7l1ucPd9sMiBiTq_1771418842591_na1fn_c3VjY2Vzcy1zcGFya2xl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWkRGS09XblA1eDh3NEIzS05GT3I1NC9zYW5kYm94L0dyYnpZOVg3bDF1Y1BkOXNNaUJpVHFfMTc3MTQxODg0MjU5MV9uYTFmbl9jM1ZqWTJWemN5MXpjR0Z5YTJ4bC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dT-VI6DQJov0MyxaiRMrKi5bxRCzP7IEY8kKI4sXOI4cyn8-Fq0Kv8KCPdg1dE0y898s2~mcA~mnQQtdiJh~rccpyH9Ac~RIi0MuNGK~CLukkNIX5LamMT1JqwNw6re-Mq1v0Yfdl6jJtBhtGJlWf4LTTXhXDBjc0j0rNNtyL0WrYZMjOOCwE6-etMEnBIf91QY3k4YrHXbBuqoLdzmh9T-ml0aGaltQL66Koy5PoonbAvYtBlndCA2CGI-BCETznYlynNEgEYAlkin~9PIoPy1MqNzVotU7v6T1guBrvjgfzLpK-qKzEAaRCbGM5f4S1NamiGiXVgOVT925g~-56Q__"
              alt="Success"
              className="w-64 h-64 mx-auto"
            />
          </motion.div>

          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-purple-700 mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            恭喜你！
          </motion.h2>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 flex justify-center"
          >
            <img
              src={voucherImg}
              alt="兑换券"
              className="max-w-full h-auto rounded-lg shadow-lg border border-white/50"
              style={{ maxWidth: "320px", maxHeight: "400px" }}
            />
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-700 mb-8 leading-relaxed"
          >
            请收下兑换券
            <br />
            <br />
            你已经成功完成了所有 8 个关卡的冒险！
            <br />
            <br />
            "生日快乐，我的大作家。"
            <br />
            <br />
            <span className="text-pink-600 font-semibold">
              请收下爱马仕Lindy26兑换券一张。
            </span>
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={handleRestartGame}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              重新开始
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      {/* 进度条 */}
      <ProgressBar current={currentChapter + 1} total={totalChapters} />

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ChapterDisplay chapter={chapter} />

            <div className="mt-8">
              <PuzzleComponent
                chapter={chapter}
                onSubmit={handleSubmitAnswer}
                feedback={feedback}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

