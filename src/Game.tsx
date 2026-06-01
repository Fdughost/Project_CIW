/**
 * 游戏主页面
 * 梦幻童话风格：柔和的紫罗兰色与暖金色，流畅的过渡动画
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui";
import { chapters, getTotalChapters } from "./gameData";
import ChapterDisplay from "./ChapterDisplay";
import PuzzleComponent from "./PuzzleComponent";
import GameShell from "./GameShell";
import voucherImg from "./assets/voucher2.png";
import introWonderlandImg from "./assets/intro-wonderland.svg";
import successSparkleImg from "./assets/success-sparkle.svg";
import firstChapterMusic from "./assets/audio/xing-zhi-suo-zai-harmonica.mp3";
import { validateAnswer, type SubmittedAnswer } from "./answerValidation";
import {
  clearGameProgress,
  loadGameProgress,
  saveGameProgress,
  type SavedGameProgress,
} from "./gameProgress";

const FIRST_CHAPTER_MUSIC_VOLUME = 0.35;
const FIRST_CHAPTER_FADE_DURATION_MS = 900;
const FIRST_CHAPTER_FADE_STEPS = 18;

type GamePhase = "intro" | "playing" | "complete";

const getChapterSuccessMessage = (chapterId: number) => {
  const messages: Record<number, string> = {
    1: "门锁齿轮转动，木门打开了。",
    2: "G 守卫转身，黄金硬币和新年利是落进了背包。",
    3: "生日礼物构建成功，主管递出了那台砖头手机。",
    4: "手机亮起，未接来电正在回拨。",
    5: "你追上了她，银色挂饰落在月光下。",
    6: "挂饰合拢，借阅卡从天上轻轻飘落。",
    7: "借阅卡补全了，「所有」两个字重新清晰起来。",
    8: "卡片完整显影了。",
  };

  return messages[chapterId] || "成功！这段冒险继续向前推进。";
};

const getChapterErrorMessage = (chapterId: number) => {
  const messages: Record<number, string> = {
    1: "门锁轻轻一震，滚轮还没有对上。",
    2: "这个假设里真话数量不对，再检查守卫证词。",
    3: "流程还会卡住，顺序和负责人都要对上。",
    4: "屏幕显示密码错误，按 C 清除后再试。",
    5: "方向不太对，继续看最新的痕迹。",
    6: "挂饰还没有合上，角度、翻面和凹槽都要匹配。",
    7: "卡片字迹又模糊了，年份和题名需要同时成立。",
    8: "这句话好像还没完整显影。",
  };

  return messages[chapterId] || "答案还没有对上，再观察一下线索。";
};

export default function Game() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [savedProgress, setSavedProgress] =
    useState<SavedGameProgress | null>(null);
  const [hintUsage, setHintUsage] = useState<Record<number, number>>({});
  const [failedAttempts, setFailedAttempts] = useState<Record<number, number>>(
    {}
  );
  const [isFirstChapterMusicPlaying, setIsFirstChapterMusicPlaying] =
    useState(false);
  const [isFirstChapterMusicMuted, setIsFirstChapterMusicMuted] =
    useState(false);
  const [showFirstChapterMusicPrompt, setShowFirstChapterMusicPrompt] =
    useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const firstChapterAudioRef = useRef<HTMLAudioElement | null>(null);
  const firstChapterFadeTimerRef = useRef<number | null>(null);
  const chapterAdvanceTimerRef = useRef<number | null>(null);

  const chapter = chapters[currentChapter];
  const totalChapters = getTotalChapters();
  const totalHintUsage = Object.values(hintUsage).reduce(
    (total, count) => total + count,
    0
  );
  const totalFailedAttempts = Object.values(failedAttempts).reduce(
    (total, count) => total + count,
    0
  );
  const savedChapter = savedProgress
    ? chapters[savedProgress.chapterIndex]
    : null;
  const savedAtText = savedProgress
    ? new Date(savedProgress.savedAt).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const clearFirstChapterFade = () => {
    if (firstChapterFadeTimerRef.current !== null) {
      window.clearInterval(firstChapterFadeTimerRef.current);
      firstChapterFadeTimerRef.current = null;
    }
  };

  const getFirstChapterAudio = () => {
    if (!firstChapterAudioRef.current) {
      const audio = new Audio(firstChapterMusic);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = FIRST_CHAPTER_MUSIC_VOLUME;
      firstChapterAudioRef.current = audio;
    }

    return firstChapterAudioRef.current;
  };

  const stopFirstChapterMusic = (resetTime = true) => {
    clearFirstChapterFade();

    const audio = firstChapterAudioRef.current;
    if (!audio) {
      setIsFirstChapterMusicPlaying(false);
      return;
    }

    audio.pause();
    if (resetTime) {
      audio.currentTime = 0;
    }
    audio.volume = isFirstChapterMusicMuted ? 0 : FIRST_CHAPTER_MUSIC_VOLUME;
    setIsFirstChapterMusicPlaying(false);
  };

  const fadeOutFirstChapterMusic = (resetTime = true) => {
    clearFirstChapterFade();

    const audio = firstChapterAudioRef.current;
    if (!audio || audio.paused) {
      stopFirstChapterMusic(resetTime);
      return;
    }

    const startVolume = audio.volume;
    const volumeStep = startVolume / FIRST_CHAPTER_FADE_STEPS;
    firstChapterFadeTimerRef.current = window.setInterval(() => {
      const nextVolume = Math.max(0, audio.volume - volumeStep);
      audio.volume = nextVolume;

      if (nextVolume <= 0) {
        stopFirstChapterMusic(resetTime);
      }
    }, FIRST_CHAPTER_FADE_DURATION_MS / FIRST_CHAPTER_FADE_STEPS);
  };

  const playFirstChapterMusic = async () => {
    const audio = getFirstChapterAudio();
    clearFirstChapterFade();
    audio.loop = true;
    audio.volume = isFirstChapterMusicMuted ? 0 : FIRST_CHAPTER_MUSIC_VOLUME;

    try {
      await audio.play();
      setIsFirstChapterMusicPlaying(true);
      setShowFirstChapterMusicPrompt(false);
    } catch {
      setIsFirstChapterMusicPlaying(false);
      setShowFirstChapterMusicPrompt(true);
    }
  };

  const handleToggleFirstChapterMusic = () => {
    if (isFirstChapterMusicPlaying) {
      stopFirstChapterMusic(false);
      return;
    }

    void playFirstChapterMusic();
  };

  const handleToggleFirstChapterMute = () => {
    const audio = getFirstChapterAudio();
    const nextMuted = !isFirstChapterMusicMuted;
    setIsFirstChapterMusicMuted(nextMuted);
    audio.volume = nextMuted ? 0 : FIRST_CHAPTER_MUSIC_VOLUME;
  };

  const handleStartGame = () => {
    if (chapterAdvanceTimerRef.current !== null) {
      window.clearTimeout(chapterAdvanceTimerRef.current);
      chapterAdvanceTimerRef.current = null;
    }
    clearGameProgress();
    setSavedProgress(null);
    setGamePhase("playing");
    setCurrentChapter(0);
    setHintUsage({});
    setFailedAttempts({});
    setFeedback({ type: null, message: "" });
    void playFirstChapterMusic();
  };

  const handleContinueGame = () => {
    if (!savedProgress) {
      return;
    }

    if (chapterAdvanceTimerRef.current !== null) {
      window.clearTimeout(chapterAdvanceTimerRef.current);
      chapterAdvanceTimerRef.current = null;
    }

    setCurrentChapter(savedProgress.chapterIndex);
    setHintUsage(savedProgress.hintUsage);
    setFailedAttempts(savedProgress.failedAttempts);
    setFeedback({ type: null, message: "" });
    setGamePhase("playing");

    if (savedProgress.chapterIndex === 0) {
      void playFirstChapterMusic();
    } else {
      stopFirstChapterMusic(true);
    }
  };

  const handleSubmitAnswer = (answer: SubmittedAnswer) => {
    const isCorrect = validateAnswer(answer, chapter.answer, chapter.validation);

    if (isCorrect) {
      setFeedback({
        type: "success",
        message: getChapterSuccessMessage(chapter.id),
      });

      if (currentChapter === 0) {
        fadeOutFirstChapterMusic(true);
      }

      if (chapterAdvanceTimerRef.current !== null) {
        window.clearTimeout(chapterAdvanceTimerRef.current);
      }

      chapterAdvanceTimerRef.current = window.setTimeout(() => {
        if (currentChapter < totalChapters - 1) {
          setCurrentChapter(currentChapter + 1);
          setFeedback({ type: null, message: "" });
        } else {
          clearGameProgress();
          setSavedProgress(null);
          setGamePhase("complete");
        }
        chapterAdvanceTimerRef.current = null;
      }, 1500);
    } else {
      setFailedAttempts((currentAttempts) => ({
        ...currentAttempts,
        [chapter.id]: (currentAttempts[chapter.id] || 0) + 1,
      }));
      setFeedback({
        type: "error",
        message: getChapterErrorMessage(chapter.id),
      });
    }
  };

  const handleRestartGame = () => {
    if (chapterAdvanceTimerRef.current !== null) {
      window.clearTimeout(chapterAdvanceTimerRef.current);
      chapterAdvanceTimerRef.current = null;
    }
    stopFirstChapterMusic(true);
    clearGameProgress();
    setSavedProgress(null);
    setGamePhase("intro");
    setCurrentChapter(0);
    setHintUsage({});
    setFailedAttempts({});
    setFeedback({ type: null, message: "" });
    setShowFirstChapterMusicPrompt(false);
    setIsFirstChapterMusicMuted(false);
  };

  const handleHintUsed = (chapterId: number, hintLevel: number) => {
    setHintUsage((currentUsage) => ({
      ...currentUsage,
      [chapterId]: Math.max(currentUsage[chapterId] || 0, hintLevel),
    }));
  };

  const handleClearSavedProgress = () => {
    clearGameProgress();
    setSavedProgress(null);
  };

  useEffect(() => {
    if (gamePhase !== "playing" || currentChapter !== 0) {
      setShowFirstChapterMusicPrompt(false);
      fadeOutFirstChapterMusic(true);
    }
    // Music fade reads the current audio ref; it should only react to chapter/phase changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter, gamePhase]);

  useEffect(() => {
    setSavedProgress(loadGameProgress(totalChapters));
  }, [totalChapters]);

  useEffect(() => {
    if (gamePhase !== "playing") {
      return;
    }

    const nextProgress: SavedGameProgress = {
      chapterIndex: currentChapter,
      hintUsage,
      failedAttempts,
      savedAt: new Date().toISOString(),
    };

    saveGameProgress(nextProgress);
    setSavedProgress(nextProgress);
  }, [currentChapter, failedAttempts, gamePhase, hintUsage]);

  useEffect(() => {
    return () => {
      if (chapterAdvanceTimerRef.current !== null) {
        window.clearTimeout(chapterAdvanceTimerRef.current);
      }
      clearFirstChapterFade();
      const audio = firstChapterAudioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  if (gamePhase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen overflow-hidden bg-[#f7f2e8]"
      >
        <img
          src={introWonderlandImg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f2e8] via-[#f7f2e8]/88 to-[#f7f2e8]/28" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-12">
          <div className="max-w-2xl">
            <motion.p
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="ciw-kicker mb-4"
            >
              Birthday Story Game
            </motion.p>
            <motion.h1
              initial={{ y: -28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-5xl font-bold leading-tight text-slate-900 md:text-7xl"
              style={{ fontFamily: "var(--ciw-font-display)" }}
            >
              Chloe in Wonderland
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mb-8 max-w-xl text-lg leading-8 text-slate-700"
            >
              亲爱的 Chloe，你面前有一杯被施了魔法的药水，它将带你进入一个奇妙的仙境世界。准备好了，就喝下它，开始你的冒险吧。
            </motion.p>

            {savedProgress && savedChapter && (
              <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.62 }}
                className="mb-6 max-w-xl rounded-2xl border border-slate-200 bg-white/82 p-4 text-left shadow-lg backdrop-blur"
              >
                <p className="text-sm font-bold text-slate-800">
                  发现上次进度：{savedChapter.title}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  保存于 {savedAtText} · 已看提示{" "}
                  {Object.values(savedProgress.hintUsage).reduce(
                    (total, count) => total + count,
                    0
                  )}{" "}
                  条
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    onClick={handleContinueGame}
                    className="ciw-soft-button bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700"
                  >
                    继续冒险
                  </Button>
                  <Button
                    onClick={handleClearSavedProgress}
                    className="rounded-lg bg-white px-5 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200"
                  >
                    清除进度
                  </Button>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.78 }}
            >
              <Button
                onClick={handleStartGame}
                className="ciw-soft-button bg-gradient-to-r from-slate-900 to-teal-700 px-8 py-4 text-lg font-bold text-white transition hover:from-slate-800 hover:to-teal-600"
              >
                {savedProgress ? "重新开始" : "开始冒险"}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (gamePhase === "complete") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f7f2e8] via-[#fff8e7] to-[#f4e8ef] p-4"
      >
        <div className="ciw-scene-panel max-w-2xl p-6 text-center md:p-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <img
              src={successSparkleImg}
              alt="Success"
              className="ciw-panel mx-auto h-56 w-56"
            />
          </motion.div>

          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
            style={{ fontFamily: "var(--ciw-font-display)" }}
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
            className="mb-8 text-xl leading-relaxed text-slate-700"
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
            <span className="font-bold text-rose-600">
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
              className="ciw-soft-button bg-slate-900 px-8 py-3 text-lg font-bold text-white transition hover:bg-slate-700"
            >
              重新开始
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <GameShell
      chapter={chapter}
      currentChapter={currentChapter + 1}
      totalChapters={totalChapters}
      totalHintUsage={totalHintUsage}
      totalFailedAttempts={totalFailedAttempts}
      chapterHintUsage={hintUsage[chapter.id] || 0}
      story={<ChapterDisplay chapter={chapter} />}
      puzzle={
        <PuzzleComponent
          key={chapter.id}
          chapter={chapter}
          onSubmit={handleSubmitAnswer}
          feedback={feedback}
        />
      }
      feedback={feedback}
      musicControls={{
        visible: currentChapter === 0,
        isPlaying: isFirstChapterMusicPlaying,
        isMuted: isFirstChapterMusicMuted,
        showPrompt: showFirstChapterMusicPrompt,
        onTogglePlay: handleToggleFirstChapterMusic,
        onToggleMute: handleToggleFirstChapterMute,
      }}
      onHintUsed={handleHintUsed}
      onRestart={handleRestartGame}
    />
  );
}
