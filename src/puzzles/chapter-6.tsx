import { useState } from "react";
import { Button } from "../ui";
import type { PuzzleProps } from "./_shared";

export function PendantMergePuzzle({ onSubmit }: PuzzleProps) {
  const [leftAngle, setLeftAngle] = useState(0);
  const [rightAngle, setRightAngle] = useState(0);
  const [rightFlipped, setRightFlipped] = useState(false);
  const [leftDocked, setLeftDocked] = useState(false);
  const [rightDocked, setRightDocked] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState<"left" | "right" | null>(null);
  const [showOutline, setShowOutline] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("两瓣挂饰冰凉地躺在手心里，像两把还没合上的剑。");

  const normalize = (angle: number) => ((angle % 360) + 360) % 360;
  const isLeftReady = leftDocked && normalize(leftAngle) === 90;
  const isRightReady = rightDocked && normalize(rightAngle) === 270 && rightFlipped;
  const isSolved = isLeftReady && isRightReady;

  const rotateLeft = () => {
    setLeftAngle((angle) => angle + 90);
    setMessage("左瓣的剑纹换了方向，边缘反出一线银光。");
  };

  const rotateRight = () => {
    setRightAngle((angle) => angle - 90);
    setMessage("右瓣的剑纹换了方向，缺口好像更接近另一半了。");
  };

  const dockPiece = (piece: "left" | "right") => {
    if (piece === "left") {
      setLeftDocked(true);
      setMessage("左瓣贴进了心形左侧的凹槽。");
      return;
    }

    setRightDocked(true);
    setMessage("右瓣贴进了心形右侧的凹槽。");
  };

  const dropPiece = (slot: "left" | "right") => {
    if (!draggedPiece) {
      return;
    }

    if (draggedPiece !== slot) {
      setMessage("这一瓣放在这里会顶住边缘，换另一侧试试。");
      setDraggedPiece(null);
      return;
    }

    dockPiece(draggedPiece);
    setDraggedPiece(null);
  };

  const tryMerge = () => {
    if (isSolved) {
      setMessage("两把剑尖相对，银色挂饰合成一枚完整的心。");
      window.setTimeout(() => onSubmit("pendant-complete"), 650);
      return;
    }

    setAttempts((current) => current + 1);
    if (!leftDocked || !rightDocked) {
      setMessage("挂饰还没放进凹槽，先把两瓣分别贴到心形两侧。");
      return;
    }

    if (!showOutline && attempts >= 1) {
      setShowOutline(true);
      setMessage("它们轻轻弹开了。Alex 把半透明轮廓按在桌面上，方便你对齐角度。");
      return;
    }

    setMessage("方向还差一点：让左瓣转向 90°，右瓣翻面后转向 270°。");
  };

  const resetPendant = () => {
    setLeftAngle(0);
    setRightAngle(0);
    setRightFlipped(false);
    setLeftDocked(false);
    setRightDocked(false);
    setDraggedPiece(null);
    setShowOutline(false);
    setAttempts(0);
    setMessage("两瓣挂饰重新分开，银色刻痕等待你再次对齐。");
  };

  const pendantPiece = (side: "left" | "right", angle: number, flipped = false) => (
    <div className="flex flex-col items-center gap-2">
      <div
        draggable
        onDragStart={() => setDraggedPiece(side)}
        className={`ciw-pendant-piece flex h-32 w-24 cursor-grab items-center justify-center text-sm font-bold transition-transform active:cursor-grabbing ${
          side === "left" ? "rounded-l-full rounded-tr-3xl" : "rounded-r-full rounded-tl-3xl"
        } ${flipped ? "is-flipped" : ""}`}
        style={{
          transform: `rotate(${angle}deg) scaleX(${flipped ? -1 : 1})`,
        }}
      >
        剑纹
      </div>
      <p className="text-xs font-semibold text-slate-600">
        {side === "left" ? "左瓣" : "右瓣"} · {normalize(angle)}°{flipped ? " · 已翻面" : ""}
      </p>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="ciw-gadget-note p-4 text-sm font-semibold">
        {message}
      </div>

      <div className={`ciw-pendant-stage p-5 ${isSolved ? "is-solved" : ""}`}>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => dropPiece("left")}
            className={`ciw-pendant-slot flex min-h-44 items-center justify-center rounded-l-[5rem] rounded-r-2xl p-4 ${
              isLeftReady
                ? "is-ready border-purple-300 bg-purple-950/30"
                : showOutline
                  ? "is-outlined border-slate-300 bg-white/10"
                  : ""
            }`}
          >
            {leftDocked ? pendantPiece("left", leftAngle) : <span className="text-sm text-slate-400">左半凹槽</span>}
          </div>
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => dropPiece("right")}
            className={`ciw-pendant-slot flex min-h-44 items-center justify-center rounded-l-2xl rounded-r-[5rem] p-4 ${
              isRightReady
                ? "is-ready border-purple-300 bg-purple-950/30"
                : showOutline
                  ? "is-outlined border-slate-300 bg-white/10"
                  : ""
            }`}
          >
            {rightDocked ? (
              pendantPiece("right", rightAngle, rightFlipped)
            ) : (
              <span className="text-sm text-slate-400">右半凹槽</span>
            )}
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-slate-500/30 bg-slate-950/35 p-4 md:grid-cols-2">
          {!leftDocked ? pendantPiece("left", leftAngle) : <p className="self-center text-center text-sm text-slate-400">左瓣已在凹槽里</p>}
          {!rightDocked ? (
            pendantPiece("right", rightAngle, rightFlipped)
          ) : (
            <p className="self-center text-center text-sm text-slate-400">右瓣已在凹槽里</p>
          )}
        </div>
      </div>

      <div className="ciw-pendant-controls grid gap-3 md:grid-cols-4">
        <Button
          type="button"
          onClick={rotateLeft}
          className="ciw-pendant-control rounded-xl bg-white py-3 font-bold text-slate-700 ring-1 ring-slate-200"
        >
          旋转左瓣
        </Button>
        <Button
          type="button"
          onClick={rotateRight}
          className="ciw-pendant-control rounded-xl bg-white py-3 font-bold text-slate-700 ring-1 ring-slate-200"
        >
          旋转右瓣
        </Button>
        <Button
          type="button"
          onClick={() => setRightFlipped((current) => !current)}
          className="ciw-pendant-control rounded-xl bg-white py-3 font-bold text-slate-700 ring-1 ring-slate-200"
        >
          翻转右瓣
        </Button>
        <Button
          type="button"
          onClick={() => setShowOutline((current) => !current)}
          className="ciw-pendant-control rounded-xl bg-white py-3 font-bold text-slate-700 ring-1 ring-slate-200"
        >
          {showOutline ? "收起轮廓" : "显示轮廓"}
        </Button>
      </div>

      <div className="ciw-pendant-dock-controls grid gap-3 md:grid-cols-3">
        <Button
          type="button"
          onClick={() => dockPiece("left")}
          className="ciw-pendant-control rounded-xl bg-slate-100 py-3 font-bold text-slate-700"
        >
          放入左槽
        </Button>
        <Button
          type="button"
          onClick={() => dockPiece("right")}
          className="ciw-pendant-control rounded-xl bg-slate-100 py-3 font-bold text-slate-700"
        >
          放入右槽
        </Button>
        <Button
          type="button"
          onClick={resetPendant}
          className="ciw-pendant-control rounded-xl bg-white py-3 font-bold text-slate-700 ring-1 ring-slate-200"
        >
          重置挂饰
        </Button>
      </div>
      <Button
        type="button"
        onClick={tryMerge}
        className="ciw-ink-button w-full py-3"
      >
        合上挂饰
      </Button>
    </div>
  );
}
