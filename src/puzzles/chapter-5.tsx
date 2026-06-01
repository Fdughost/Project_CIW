import { useCallback, useEffect, useState } from "react";
import { optionButtonClass, type PuzzleProps } from "./_shared";

export function ChasePathPuzzle({ onSubmit }: PuzzleProps) {
  const roundSeconds = 6;
  const steps = [
    {
      clue: "泥土上最新的脚印偏向右侧，草叶还没弹回去。",
      correct: "right",
      options: [
        { id: "left", label: "左边小径" },
        { id: "forward", label: "正前石阶" },
        { id: "right", label: "右侧草坡" },
      ],
    },
    {
      clue: "电话里传来水声，左边的溪流方向还有急促脚步。",
      correct: "left",
      options: [
        { id: "left", label: "沿溪流走" },
        { id: "forward", label: "穿过拱门" },
        { id: "right", label: "绕进树林" },
      ],
    },
    {
      clue: "断枝指向正前方，树脂还亮晶晶的。",
      correct: "forward",
      options: [
        { id: "left", label: "左侧花径" },
        { id: "forward", label: "正前矮桥" },
        { id: "right", label: "右侧石墙" },
      ],
    },
    {
      clue: "一片衣角划过右边篱笆，铃声也在那里晃了一下。",
      correct: "right",
      options: [
        { id: "left", label: "旧木门" },
        { id: "forward", label: "玫瑰棚" },
        { id: "right", label: "篱笆缺口" },
      ],
    },
    {
      clue: "最后一串脚印突然变浅，左边月光下有银色反光。",
      correct: "left",
      options: [
        { id: "left", label: "月光小路" },
        { id: "forward", label: "钟楼台阶" },
        { id: "right", label: "低矮灌木" },
      ],
    },
  ];
  const [stepIndex, setStepIndex] = useState(0);
  const [path, setPath] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(roundSeconds);
  const [isChaseComplete, setIsChaseComplete] = useState(false);
  const [message, setMessage] = useState("她还没有跑远，先看清眼前的痕迹。");
  const currentStep = steps[stepIndex];

  const registerMiss = useCallback((reason: string) => {
    if (isChaseComplete) {
      return;
    }

    const nextMistakes = mistakes + 1;
    if (nextMistakes >= 3) {
      setStepIndex(0);
      setPath([]);
      setMistakes(0);
      setTimeLeft(roundSeconds);
      setMessage("你跟丢了一小段，只好回到刚才的岔路重新辨认。");
      return;
    }
    setMistakes(nextMistakes);
    setTimeLeft(roundSeconds);
    setMessage(reason);
  }, [isChaseComplete, mistakes, roundSeconds]);

  const choosePath = (choice: string) => {
    if (isChaseComplete) {
      return;
    }

    if (choice !== currentStep.correct) {
      registerMiss("方向不太对，脚步声变远了。再看一次线索。");
      return;
    }

    const nextPath = [...path, choice];
    if (stepIndex === steps.length - 1) {
      setPath(nextPath);
      setIsChaseComplete(true);
      setMessage("追上了。女生停在月光下，脚边掉出一枚银色挂饰。");
      onSubmit(nextPath);
      return;
    }

    setPath(nextPath);
    setStepIndex((current) => current + 1);
    setTimeLeft(roundSeconds);
    setMessage("追近了一点，前方又出现新的痕迹。");
  };

  useEffect(() => {
    if (isChaseComplete) {
      return;
    }

    if (timeLeft <= 0) {
      registerMiss("你迟疑了一下，电话里的喘息声远了。重新判断这个岔路。");
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [timeLeft, stepIndex, mistakes, isChaseComplete, registerMiss]);

  return (
    <div className="space-y-5">
      <div
        className={`ciw-chase-map p-4 text-emerald-50 ${
          isChaseComplete ? "is-complete" : mistakes > 0 ? "has-mistake" : ""
        }`}
      >
        <div className="mb-3 flex items-center justify-between text-sm">
          <span>追踪进度 {stepIndex + 1} / {steps.length}</span>
          <span>倒计时 {timeLeft}s · 失误 {mistakes} / 3</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-emerald-800">
          <div
            className="h-full rounded-full bg-emerald-300 transition-all"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-emerald-800">
          <div
            className="h-full rounded-full bg-yellow-200 transition-all"
            style={{ width: `${(timeLeft / roundSeconds) * 100}%` }}
          />
        </div>
        <p className="mt-4 text-sm">{message}</p>
      </div>
      <div className="grid grid-cols-5 gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
        {steps.map((step, index) => (
          <div
            key={step.clue}
            className={`ciw-chase-step rounded-lg border p-2 text-center text-xs font-semibold ${
              index < stepIndex
                ? "is-complete border-emerald-300 bg-emerald-100 text-emerald-700"
                : index === stepIndex
                  ? "is-current border-yellow-300 bg-yellow-100 text-yellow-800"
                  : "border-emerald-100 bg-white text-emerald-400"
            }`}
          >
            {index < stepIndex ? "已追踪" : index === stepIndex ? "当前岔路" : "未知"}
          </div>
        ))}
      </div>
      <div className="ciw-gadget-note p-4">
        <p className="font-semibold text-emerald-900">{currentStep.clue}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {currentStep.options.map((option) => (
          <button
            key={option.id}
            type="button"
            disabled={isChaseComplete}
            onClick={() => choosePath(option.id)}
            className={`${optionButtonClass} disabled:opacity-60`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
