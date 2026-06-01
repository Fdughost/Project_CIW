import { useState } from "react";
import { Button } from "../ui";
import type { PuzzleProps } from "./_shared";

export function GuardLogicPuzzle({ onSubmit }: PuzzleProps) {
  const guards = [
    { id: "A", statement: "黄金在 A 或 B 的身后。" },
    { id: "B", statement: "黄金在 C 或 D 的身后。" },
    { id: "C", statement: "黄金在 E 或 F 的身后。" },
    { id: "D", statement: "黄金不在 G 的身后。" },
    { id: "E", statement: "黄金在 B 或 E 的身后。" },
    { id: "F", statement: "黄金在 A 或 C 的身后。" },
    { id: "G", statement: "黄金就在我的身后。" },
  ];
  const [selectedGuard, setSelectedGuard] = useState<string | null>(null);
  const [marks, setMarks] = useState<Record<string, "unknown" | "truth" | "lie">>(
    Object.fromEntries(guards.map((guard) => [guard.id, "unknown"]))
  );

  const cycleMark = (guardId: string) => {
    setMarks((currentMarks) => {
      const current = currentMarks[guardId];
      const next = current === "unknown" ? "truth" : current === "truth" ? "lie" : "unknown";
      return { ...currentMarks, [guardId]: next };
    });
  };

  const truthCountForG = guards.filter((guard) => guard.id === "G").length;

  return (
    <div className="space-y-5">
      <div className="ciw-gadget-note p-4 text-sm">
        <p className="ciw-gadget-label mb-1">
          Deduction Desk
        </p>
        规则：只有一个真正的骑士会说真话，其余守卫都在说谎。给证词做标记，再把骑士徽章交给你相信的人。
      </div>
      <div className="ciw-guard-grid">
        {guards.map((guard) => (
          <div
            key={guard.id}
            className={`ciw-guard-card p-4 text-left transition ${
              selectedGuard === guard.id
                ? "is-selected"
                : ""
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedGuard(guard.id)}
                className="ciw-guard-avatar"
                aria-label={`选择守卫 ${guard.id}`}
              >
                {guard.id}
              </button>
              <span className={`ciw-mark-pill is-${marks[guard.id]}`}>
                {marks[guard.id] === "truth"
                  ? "真话"
                  : marks[guard.id] === "lie"
                    ? "谎话"
                    : "待定"}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
              {guard.statement}
            </p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                cycleMark(guard.id);
              }}
              className="ciw-mark-pill is-action mt-3 inline-flex"
            >
              切换标记
            </button>
          </div>
        ))}
      </div>
      <div className="ciw-logic-board p-4 text-sm font-semibold">
        {selectedGuard === "G"
          ? "推理板：如果黄金在 G 身后，A-F 的区间判断都为假，只有 G 的话为真；这正好符合规则。"
          : "推理板：先选一名守卫，再检查这个假设下是否恰好只有一句真话。"}
      </div>
      <Button
        type="button"
        disabled={!selectedGuard}
        onClick={() => selectedGuard && onSubmit(selectedGuard)}
        className={`ciw-badge-button ciw-ink-button w-full py-3 disabled:opacity-50 ${
          selectedGuard === "G" ? "is-ready" : ""
        }`}
      >
        把骑士徽章交给 {selectedGuard || "……"}
      </Button>
      <p className="sr-only">当黄金在 G 身后时，真话数量是 {truthCountForG}。</p>
    </div>
  );
}
