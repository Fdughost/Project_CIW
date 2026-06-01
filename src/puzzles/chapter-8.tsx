import { useMemo, useState } from "react";
import { Button, Input } from "../ui";
import type { PuzzleProps } from "./_shared";

export function CardRevealPuzzle({ onSubmit }: PuzzleProps) {
  const [lightLevel, setLightLevel] = useState(0);
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [firstTail, setFirstTail] = useState("");
  const [secondTail, setSecondTail] = useState("");
  const revealedFragments = useMemo(() => {
    const fragments = [];
    if (lightLevel >= 25) {
      fragments.push("余光");
    }
    if (lightLevel >= 55) {
      fragments.push("是你");
    }
    if (lightLevel >= 80) {
      fragments.push("也是你");
    }
    return fragments;
  }, [lightLevel]);

  const tilt = (lightLevel - 50) / 10;
  const firstPreview = lightLevel >= 25 ? "余光 _ _" : "余 _ _ _";
  const secondPreview = lightLevel >= 80 ? "余生也 _ _" : "余生 _ _ _";

  return (
    <div className="space-y-5">
      <div
        className={`ciw-moon-card-stage p-5 ${
          lightLevel >= 55 ? "is-revealing" : ""
        } ${lightLevel >= 80 ? "is-complete" : ""}`}
      >
        <div
          className="ciw-reveal-card ciw-paper-card p-6 text-center transition-transform"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Alex 递来的卡片
          </p>
          {isBackVisible ? (
            <div className="flex min-h-40 items-center justify-center font-serif text-xl font-bold text-slate-700">
              别看了，莫奈没说过这句话。
            </div>
          ) : (
            <div className="space-y-4 font-serif text-3xl font-bold text-slate-900">
              <p>{firstPreview}</p>
              <p>{secondPreview}</p>
            </div>
          )}
          {!isBackVisible && (
            <div className="mt-6 flex min-h-8 flex-wrap justify-center gap-2">
              {revealedFragments.length === 0 ? (
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-400">
                  隐藏字迹还没有显出来
                </span>
              ) : (
                revealedFragments.map((fragment) => (
                  <span
                    key={fragment}
                    className="ciw-ink-fragment rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700"
                  >
                    显影碎片：{fragment}
                  </span>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="ciw-object-card p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-slate-700">月光角度</p>
          <button
            type="button"
            onClick={() => setIsBackVisible((current) => !current)}
            className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white"
          >
            {isBackVisible ? "翻回正面" : "翻看背面"}
          </button>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={lightLevel}
          onChange={(event) => setLightLevel(Number(event.target.value))}
          className="w-full accent-indigo-600"
          aria-label="调整月光角度"
        />
        <div className="ciw-light-step-row mt-3 grid grid-cols-4 gap-2 text-xs font-bold text-slate-600">
          {[25, 55, 80, 100].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setLightLevel(level)}
              className="ciw-light-step-button rounded-lg bg-indigo-50 px-2 py-2 text-indigo-700"
            >
              {level}%
            </button>
          ))}
        </div>
      </div>

      <div className="ciw-object-card ciw-card-answer-grid grid gap-3 p-4 md:grid-cols-2">
        <label className="font-serif text-xl font-bold text-slate-900">
          余
          <Input
            value={firstTail}
            onChange={(event) => setFirstTail(event.target.value)}
            placeholder="___"
            className="mt-2 border-indigo-200 py-3 text-lg font-bold"
          />
        </label>
        <label className="font-serif text-xl font-bold text-slate-900">
          余生
          <Input
            value={secondTail}
            onChange={(event) => setSecondTail(event.target.value)}
            placeholder="___"
            className="mt-2 border-indigo-200 py-3 text-lg font-bold"
          />
        </label>
      </div>
      <Button
        type="button"
        disabled={!firstTail.trim() || !secondTail.trim()}
        onClick={() => onSubmit([`余${firstTail}`, `余生${secondTail}`])}
        className="ciw-ink-button w-full py-3 disabled:opacity-50"
      >
        交还卡片
      </Button>
    </div>
  );
}
