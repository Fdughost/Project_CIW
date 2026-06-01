import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { GameChapter } from "./gameData";

interface MusicControls {
  visible: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  showPrompt: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

interface GameShellProps {
  chapter: GameChapter;
  currentChapter: number;
  totalChapters: number;
  totalHintUsage: number;
  totalFailedAttempts: number;
  chapterHintUsage: number;
  story: ReactNode;
  puzzle: ReactNode;
  feedback: {
    type: "success" | "error" | null;
    message: string;
  };
  musicControls: MusicControls;
  onHintUsed: (chapterId: number, hintLevel: number) => void;
  onRestart: () => void;
}

const chapterScene: Record<number, string> = {
  1: "Wooden Lodge",
  2: "Guard Testimony",
  3: "Coder Paradise",
  4: "Old Nokia",
  5: "Moonlit Chase",
  6: "Twin Pendant",
  7: "Library Archive",
  8: "Moonlit Card",
};

const collectedProps = [
  { chapter: 1, label: "口琴", symbol: "♪", kind: "harmonica" },
  { chapter: 2, label: "金币", symbol: "G", kind: "coin" },
  { chapter: 3, label: "利是", symbol: "R", kind: "redpacket" },
  { chapter: 4, label: "手机", symbol: "☎", kind: "phone" },
  { chapter: 5, label: "挂饰", symbol: "◇", kind: "pendant" },
  { chapter: 6, label: "借阅卡", symbol: "L", kind: "card" },
  { chapter: 7, label: "所有", symbol: "全", kind: "word" },
  { chapter: 8, label: "卡片", symbol: "✦", kind: "letter" },
];

function TopHud({
  chapter,
  currentChapter,
  totalChapters,
  totalHintUsage,
  totalFailedAttempts,
  musicControls,
  onRestart,
}: Pick<
  GameShellProps,
  | "chapter"
  | "currentChapter"
  | "totalChapters"
  | "totalHintUsage"
  | "totalFailedAttempts"
  | "musicControls"
  | "onRestart"
>) {
  const progress = currentChapter / totalChapters;

  return (
    <header className="ciw-archive-hud">
      <div className="ciw-hud-brand">
        <span className="ciw-portrait-token" aria-hidden="true">
          C
        </span>
        <div>
          <p className="ciw-hud-title">
            Chapter {String(currentChapter).padStart(2, "0")}
          </p>
          <p className="ciw-hud-subtitle">
            {chapterScene[chapter.id]} · Chloe in Wonderland
          </p>
        </div>
      </div>

      <div className="ciw-hud-progress" aria-label="章节进度">
        <div className="ciw-progress-meta">
          <span>Progress</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="ciw-progress-rail">
          {Array.from({ length: totalChapters }).map((_, index) => {
            const chapterNumber = index + 1;
            return (
              <span
                key={chapterNumber}
                className={`ciw-progress-node ${
                  chapterNumber < currentChapter
                    ? "is-complete"
                    : chapterNumber === currentChapter
                      ? "is-current"
                      : ""
                }`}
                title={`Chapter ${chapterNumber}`}
              />
            );
          })}
        </div>
      </div>

      <div className="ciw-hud-props" aria-label="已获得道具">
        <p className="ciw-hud-mini-label">Collected</p>
        <div className="ciw-prop-row">
          {collectedProps.map((item) => {
            const state =
              item.chapter < currentChapter
                ? "is-earned"
                : item.chapter === currentChapter
                  ? "is-active"
                  : "";
            return (
              <span
                key={item.label}
                className={`ciw-prop-token ${state}`}
                data-kind={item.kind}
                title={item.label}
              >
                <span>{item.symbol}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="ciw-hud-actions">
        <span className="ciw-stat-chip" title="已查看提示">
          H {totalHintUsage}
        </span>
        <span className="ciw-stat-chip" title="错误尝试">
          E {totalFailedAttempts}
        </span>
        {musicControls.visible && (
          <div className="ciw-music-gadget">
            {musicControls.showPrompt && !musicControls.isPlaying && (
              <span className="ciw-music-prompt">Music?</span>
            )}
            <button
              type="button"
              onClick={musicControls.onTogglePlay}
              className="ciw-round-gadget"
              title="寻道树 - 星之所在（口琴版）（Cover う～み）"
            >
              {musicControls.isPlaying ? "Ⅱ" : "▶"}
            </button>
            <button
              type="button"
              onClick={musicControls.onToggleMute}
              className="ciw-round-gadget"
              title="静音或恢复第一章背景音乐"
            >
              {musicControls.isMuted ? "M" : "♪"}
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="ciw-menu-gadget"
          title="返回首页"
          aria-label="返回首页"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

function StorybookPanel({
  chapter,
  story,
  hintTray,
}: Pick<GameShellProps, "chapter" | "story"> & { hintTray: ReactNode }) {
  return (
    <section className="ciw-storybook-panel" aria-label="故事档案书">
      <div className="ciw-book-ribbons" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="ciw-book-lock" aria-hidden="true">
        <span className="ciw-book-lock-heart" />
      </div>
      <div className="ciw-page-tabs" aria-hidden="true">
        <span>
          <svg viewBox="0 0 24 24">
            <path d="M9 4c-2 3-1 6 1 7-1 1-2 3-2 5h8c0-3-2-5-4-6 2-1 3-3 2-5 0-2-3-3-5-1zm-3 14h12v2H6z" />
          </svg>
        </span>
        <span>
          <svg viewBox="0 0 24 24">
            <circle cx="8" cy="9" r="4" fill="none" strokeWidth="1.6" stroke="currentColor" />
            <circle cx="8" cy="9" r="1.4" />
            <path d="M11 10l8 0M16 10l0 3M19 10l0 4" strokeWidth="1.6" stroke="currentColor" fill="none" strokeLinecap="round" />
          </svg>
        </span>
        <span>
          <svg viewBox="0 0 24 24">
            <path d="M12 2l1.5 3.5L17 5l-1.5 3 3 1.5-3 1.5L17 14l-3.5-.5L12 17l-1.5-3.5L7 14l1.5-3-3-1.5 3-1.5L7 5l3.5.5z" fill="none" strokeWidth="1.4" stroke="currentColor" strokeLinejoin="round" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
        </span>
        <span>
          <svg viewBox="0 0 24 24">
            <path d="M12 20s-7-5-7-11c0-3 2-5 4.5-5 1.5 0 2.5 1 2.5 1s1-1 2.5-1c2.5 0 4.5 2 4.5 5 0 6-7 11-7 11z" />
          </svg>
        </span>
        <span>
          <svg viewBox="0 0 24 24">
            <path d="M12 3l5 6-5 12-5-12z" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinejoin="round" />
            <path d="M7 9h10M12 3v18" strokeWidth="1.4" stroke="currentColor" fill="none" />
          </svg>
        </span>
      </div>

      <div className="ciw-book-page">
        <svg
          className="ciw-book-alice"
          viewBox="0 0 120 240"
          aria-hidden="true"
        >
          <path
            d="M60 22c8 0 14 7 14 16 0 6-2 11-5 14 5 4 9 11 9 18l-3 11 4 18-2 18 5 30c2 14 1 28-3 42l-3 14 4 18-5 9-4-10c-3 8-9 13-11 13s-8-5-11-13l-4 10-5-9 4-18-3-14c-4-14-5-28-3-42l5-30-2-18 4-18-3-11c0-7 4-14 9-18-3-3-5-8-5-14 0-9 6-16 14-16z"
            fill="currentColor"
            opacity="0.06"
          />
          <path
            d="M40 90c4 2 8 6 10 12M80 90c-4 2-8 6-10 12"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
        <div className="ciw-book-corner-c" aria-hidden="true">
          <span>C</span>
        </div>
        <p className="ciw-book-master-title">CHLOE IN WONDERLAND</p>
        <p className="ciw-book-master-subtitle">— STORYBOOK ARCHIVE —</p>
        <p className="ciw-archive-label">Chapter {String(chapter.id).padStart(2, "0")}</p>
        <h1>{chapter.title.replace(/^第[一二三四五六七八]章\s*/, "")}</h1>
        <p className="ciw-scene-label">{chapterScene[chapter.id]}</p>
        <div className="ciw-page-rule" />
        <div className="ciw-story-copy">{story}</div>
        <div className="ciw-book-hint-slot">{hintTray}</div>
      </div>
    </section>
  );
}

function ObjectWorkbench({
  chapter,
  feedback,
  puzzle,
}: Pick<GameShellProps, "chapter" | "feedback" | "puzzle">) {
  return (
    <section
      className={`ciw-workbench-panel ciw-workbench-chapter-${chapter.id}`}
      aria-label="章节道具桌"
    >
      <div className="ciw-objective-plaque">
        <p className="ciw-objective-label">— OBJECTIVE —</p>
        <p className="ciw-objective-text">{chapter.puzzleQuestion}</p>
      </div>

      {feedback.type && (
        <div className={`ciw-event-ribbon ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <div className={`ciw-puzzle-stage ciw-puzzle-${chapter.puzzleType}`}>
        {puzzle}
      </div>
    </section>
  );
}

function BottomCommandBar({
  chapter,
  chapterHintUsage,
  onHintUsed,
}: Pick<GameShellProps, "chapter" | "chapterHintUsage" | "onHintUsed">) {
  const [visibleHintCount, setVisibleHintCount] = useState(0);
  const hints = useMemo(() => chapter.hints || [], [chapter.hints]);

  useEffect(() => {
    setVisibleHintCount(0);
  }, [chapter.id]);

  const handleHintClick = () => {
    if (!hints.length) {
      return;
    }

    if (visibleHintCount >= hints.length) {
      setVisibleHintCount(0);
      return;
    }

    const nextCount = visibleHintCount + 1;
    setVisibleHintCount(nextCount);
    onHintUsed(chapter.id, nextCount);
  };

  return (
    <footer className="ciw-command-bar">
      <div className="ciw-command-left">
        <button type="button" className="ciw-command-gadget" onClick={handleHintClick}>
          <span>Hint</span>
          <strong>
            {visibleHintCount === 0
              ? "查看提示"
              : visibleHintCount >= hints.length
                ? "收起提示"
                : "再看一条"}
          </strong>
        </button>
        <div className="ciw-command-counter">
          本章已记录 {chapterHintUsage} 条提示
        </div>
      </div>

      <div className="ciw-hint-drawer" aria-live="polite">
        {visibleHintCount > 0 ? (
          hints.slice(0, visibleHintCount).map((hint, index) => (
            <p key={hint}>
              <span>Hint {index + 1}</span>
              {hint}
            </p>
          ))
        ) : (
          <p>
            <span>Archive Note</span>
            先观察右侧道具，必要时再展开提示。
          </p>
        )}
      </div>
    </footer>
  );
}

export default function GameShell({
  chapter,
  currentChapter,
  totalChapters,
  totalHintUsage,
  totalFailedAttempts,
  chapterHintUsage,
  story,
  puzzle,
  feedback,
  musicControls,
  onHintUsed,
  onRestart,
}: GameShellProps) {
  const hintTray = (
    <BottomCommandBar
      chapter={chapter}
      chapterHintUsage={chapterHintUsage}
      onHintUsed={onHintUsed}
    />
  );

  return (
    <div className={`ciw-archive-shell ciw-archive-chapter-${chapter.id}`}>
      <TopHud
        chapter={chapter}
        currentChapter={currentChapter}
        totalChapters={totalChapters}
        totalHintUsage={totalHintUsage}
        totalFailedAttempts={totalFailedAttempts}
        musicControls={musicControls}
        onRestart={onRestart}
      />
      <main className="ciw-archive-board">
        <StorybookPanel chapter={chapter} story={story} hintTray={hintTray} />
        <ObjectWorkbench chapter={chapter} feedback={feedback} puzzle={puzzle} />
      </main>
      <button
        type="button"
        className="ciw-page-back"
        onClick={onRestart}
        aria-label="返回首页"
        title="返回首页"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
