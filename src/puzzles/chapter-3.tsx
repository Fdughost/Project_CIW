import { useState } from "react";
import { Button } from "../ui";
import type { PuzzleProps } from "./_shared";

export function WorkflowRepairPuzzle({ onSubmit }: PuzzleProps) {
  const correctOrder = ["需求", "设计", "编码", "测试", "发布"];
  const correctOwners: Record<string, string> = {
    需求: "产品",
    设计: "架构",
    编码: "码农",
    测试: "测试",
    发布: "主管",
  };
  const ownerOptions = ["未分配", "产品", "架构", "码农", "测试", "主管"];
  const [steps, setSteps] = useState(["编码", "需求", "发布", "设计", "测试"]);
  const [owners, setOwners] = useState<Record<string, string>>({
    编码: "产品",
    需求: "码农",
    发布: "测试",
    设计: "主管",
    测试: "架构",
  });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [buildState, setBuildState] = useState<"idle" | "blocked" | "success">("idle");
  const [runMessage, setRunMessage] = useState("主管盯着屏幕，等待你整理流程。");

  const reorderStep = (source: number, target: number) => {
    if (target < 0 || target >= steps.length) {
      return;
    }

    setSteps((currentSteps) => {
      const nextSteps = [...currentSteps];
      const [step] = nextSteps.splice(source, 1);
      nextSteps.splice(target, 0, step);
      return nextSteps;
    });
    setBuildState("idle");
  };

  const moveStep = (index: number, delta: number) => {
    reorderStep(index, index + delta);
  };

  const updateOwner = (step: string, owner: string) => {
    setOwners((currentOwners) => ({ ...currentOwners, [step]: owner }));
    setBuildState("idle");
  };

  const runWorkflow = () => {
    const firstWrongIndex = steps.findIndex((step, index) => step !== correctOrder[index]);
    if (firstWrongIndex !== -1) {
      setBuildState("blocked");
      setRunMessage(`流程卡在「${steps[firstWrongIndex]}」：礼物还没准备好就被送去下一站了。`);
      return;
    }

    const wrongOwnerStep = correctOrder.find((step) => owners[step] !== correctOwners[step]);
    if (wrongOwnerStep) {
      setBuildState("blocked");
      setRunMessage(`「${wrongOwnerStep}」节点的人选不对，主管说这里需要 ${correctOwners[wrongOwnerStep]} 来接手。`);
      return;
    }

    setBuildState("success");
    setRunMessage("构建通过：生日礼物从需求一路跑到发布，主管把砖头手机扔了出来。");
    window.setTimeout(() => onSubmit("workflow-complete"), 900);
  };

  return (
    <div className="space-y-5">
      <div className={`ciw-workflow-machine is-${buildState} p-4 text-green-200`}>
        <div className="mb-3 flex items-center gap-2 text-xs text-green-400">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="ml-2">birthday-build.pipeline</span>
        </div>
        <div className="ciw-role-token-row" aria-hidden="true">
          {ownerOptions.slice(1).map((owner) => (
            <span key={owner}>{owner}</span>
          ))}
        </div>
        <p className="font-mono text-sm">{runMessage}</p>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {correctOrder.map((step, index) => (
            <div
              key={step}
              className={`ciw-pipeline-node rounded-md px-2 py-2 text-center text-[11px] font-semibold ${
                steps[index] === step && owners[step] === correctOwners[step]
                  ? "is-passed bg-green-500/20 text-green-200"
                  : buildState === "blocked"
                    ? "is-blocked bg-red-500/20 text-red-200"
                    : "bg-white/10 text-green-100"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {steps.map((step, index) => (
          <div
            key={step}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggedIndex !== null) {
                reorderStep(draggedIndex, index);
                setDraggedIndex(null);
              }
            }}
            className={`ciw-task-card grid gap-3 p-3 transition md:grid-cols-[40px_1fr_150px_88px] ${
              buildState === "blocked" &&
              (step !== correctOrder[index] || owners[step] !== correctOwners[step])
                ? "is-blocked border-rose-300 bg-rose-50"
                : "hover:border-amber-500"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{step}</p>
              <p className="text-xs text-gray-500">拖动排序，或用上下按钮；再给节点安排合适的人。</p>
            </div>
            <label className="text-xs font-bold text-slate-600">
              负责人
              <select
                value={owners[step]}
                onChange={(event) => updateOwner(step, event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm font-semibold text-slate-800"
              >
                {ownerOptions.map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-1 self-center">
              <button
                type="button"
                onClick={() => moveStep(index, -1)}
                className="ciw-step-move-button h-9 w-9 rounded-lg bg-slate-100 font-bold text-slate-700"
                aria-label={`${step} 上移`}
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveStep(index, 1)}
                className="ciw-step-move-button h-9 w-9 rounded-lg bg-slate-100 font-bold text-slate-700"
                aria-label={`${step} 下移`}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={runWorkflow}
          className="ciw-ink-button flex-1 py-3"
        >
          运行流程
        </Button>
        <Button
          type="button"
          onClick={() => {
            setSteps(["编码", "需求", "发布", "设计", "测试"]);
            setOwners({
              编码: "产品",
              需求: "码农",
              发布: "测试",
              设计: "主管",
              测试: "架构",
            });
            setBuildState("idle");
            setRunMessage("主管盯着屏幕，等待你整理流程。");
          }}
          className="rounded-xl bg-white px-4 py-3 font-bold text-slate-700 ring-1 ring-slate-200"
        >
          重置
        </Button>
      </div>
    </div>
  );
}
