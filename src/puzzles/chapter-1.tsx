import { useEffect, useState } from "react";
import { Button } from "../ui";
import type { PuzzleProps } from "./_shared";
import { HarmonicaArt, ScorePaperArt, WoodenDoorLockArt } from "./chapter-1-art";

export function HarmonicaLockPuzzle({ onSubmit }: PuzzleProps) {
  const melody = ["1", "7", "13", "7", "5", "6", "6", "1", "4", "4", "1", "7", "5", "67", "3", "2"];
  const highlightedIndexes = new Set([3, 4, 5, 8]);
  const [digits, setDigits] = useState(["0", "0", "0", "0"]);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);
  const [unlockAttempted, setUnlockAttempted] = useState(false);

  useEffect(() => {
    if (activeNoteIndex === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveNoteIndex((current) => {
        if (current === null || current >= melody.length - 1) {
          return null;
        }
        return current + 1;
      });
    }, 260);

    return () => window.clearTimeout(timer);
  }, [activeNoteIndex, melody.length]);

  const updateDigit = (index: number, delta: number) => {
    setDigits((currentDigits) => {
      const nextDigits = [...currentDigits];
      const current = Number(nextDigits[index]);
      nextDigits[index] = String((current + delta + 10) % 10);
      return nextDigits;
    });
    setUnlockAttempted(false);
  };

  return (
    <div className="ciw-harmonica-scene">
      <div className="ciw-prop ciw-prop-score">
        <ScorePaperArt />
        <div className="ciw-prop-score-content">
          <p className="ciw-prop-score-eyebrow">Harmonica Score · 桌上的旧乐谱</p>
          <div className="ciw-melody-row">
            {melody.map((note, index) => {
              const isActive = activeNoteIndex === index;
              const isKey = highlightedIndexes.has(index);
              return (
                <span
                  key={`${note}-${index}`}
                  className={`ciw-note-token ${
                    isActive ? "is-active" : isKey ? "is-key" : ""
                  }`}
                >
                  {note}
                </span>
              );
            })}
          </div>
          <Button
            type="button"
            onClick={() => setActiveNoteIndex(0)}
            className="ciw-brass-button ciw-prop-score-play"
          >
            试吹一遍
          </Button>
        </div>
      </div>

      <div className="ciw-prop ciw-prop-harmonica">
        <HarmonicaArt />
      </div>

      <div className="ciw-prop ciw-prop-cabin-note">
        For you,
        <br />
        on your birthday
      </div>

      <div className="ciw-rose-petals" aria-hidden="true">
        <svg viewBox="0 0 120 80">
          <defs>
            <radialGradient id="petal-r" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0" stopColor="#f47e9a" />
              <stop offset="1" stopColor="#7c1d36" />
            </radialGradient>
          </defs>
          <ellipse cx="20" cy="50" rx="9" ry="5" fill="url(#petal-r)" transform="rotate(-15 20 50)" />
          <ellipse cx="42" cy="64" rx="11" ry="6" fill="url(#petal-r)" transform="rotate(20 42 64)" opacity="0.85" />
          <ellipse cx="68" cy="46" rx="8" ry="4.5" fill="url(#petal-r)" transform="rotate(-30 68 46)" opacity="0.9" />
          <ellipse cx="90" cy="60" rx="10" ry="5.5" fill="url(#petal-r)" transform="rotate(10 90 60)" opacity="0.95" />
          <ellipse cx="105" cy="40" rx="7" ry="4" fill="url(#petal-r)" transform="rotate(-25 105 40)" opacity="0.75" />
        </svg>
      </div>

      <div className={`ciw-prop ciw-prop-door ${unlockAttempted ? "is-turning" : ""}`}>
        <WoodenDoorLockArt />
        <div className="ciw-door-lock-overlay">
          {digits.map((digit, index) => (
            <div key={index} className="ciw-lock-wheel">
              <button
                type="button"
                onClick={() => updateDigit(index, 1)}
                className="ciw-lock-stepper"
                aria-label={`第 ${index + 1} 位加一`}
              >
                +
              </button>
              <div className={`ciw-lock-digit ${digit !== "0" ? "is-set" : ""}`}>
                {digit}
              </div>
              <button
                type="button"
                onClick={() => updateDigit(index, -1)}
                className="ciw-lock-stepper"
                aria-label={`第 ${index + 1} 位减一`}
              >
                −
              </button>
            </div>
          ))}
        </div>
        <div className="ciw-door-actions">
          <Button
            type="button"
            onClick={() => {
              setUnlockAttempted(true);
              onSubmit(digits.join(""));
            }}
            className="ciw-brass-button ciw-door-submit"
          >
            转动门锁
          </Button>
          <Button
            type="button"
            onClick={() => {
              setDigits(["0", "0", "0", "0"]);
              setUnlockAttempted(false);
            }}
            className="ciw-door-reset"
          >
            重置
          </Button>
        </div>
      </div>
    </div>
  );
}
