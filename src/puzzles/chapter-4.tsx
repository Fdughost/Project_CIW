import { useState } from "react";
import type { PuzzleProps } from "./_shared";

export function NokiaKeypadPuzzle({ onSubmit }: PuzzleProps) {
  const [input, setInput] = useState("");
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [showCodes, setShowCodes] = useState(true);
  const [phoneStatus, setPhoneStatus] = useState<"locked" | "error" | "unlocked">("locked");

  const handleKey = (key: string) => {
    if (phoneStatus === "unlocked") {
      return;
    }

    if (key === "#") {
      if (input.length > 0) {
        if (input === "5683") {
          setPhoneStatus("unlocked");
          window.setTimeout(() => onSubmit(input), 900);
        } else {
          setPhoneStatus("error");
          onSubmit(input);
        }
      }
      return;
    }
    if (key === "C") {
      setInput((current) => current.slice(0, -1));
      setPhoneStatus("locked");
      return;
    }
    if (input.length < 4 && /^\d$/.test(key)) {
      setInput((current) => `${current}${key}`);
      setPhoneStatus("locked");
    }
  };

  const keys = ["1", "2 ABC", "3 DEF", "4 GHI", "5 JKL", "6 MNO", "7 PQRS", "8 TUV", "9 WXYZ", "C", "0", "#"];

  return (
    <div className="ciw-nokia-layout grid gap-5 lg:grid-cols-[1fr_220px]">
      <div className={`ciw-phone-body is-${phoneStatus} p-5 text-white`}>
        <div className="mb-3 text-center text-xs font-black tracking-[0.28em] text-slate-300">
          NOKIA
        </div>
        <div className={`ciw-phone-screen is-${phoneStatus} mb-4 min-h-32 p-4 font-mono`}>
          {isBackVisible ? (
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-gray-500">back cover</p>
              <p className="mt-2 text-3xl font-bold tracking-[0.4em]">LOVE</p>
            </div>
          ) : phoneStatus === "unlocked" ? (
            <div>
              <p className="text-xs">NOKIA 3210</p>
              <p className="mt-2 text-xl font-bold">1 个未接来电</p>
              <p className="mt-2 text-xs">正在回拨……</p>
            </div>
          ) : (
            <div>
              <p className="text-xs">NOKIA 3210</p>
              <p className={`mt-2 text-2xl tracking-[0.35em] ${phoneStatus === "error" ? "text-red-600" : ""}`}>
                {phoneStatus === "error" ? "密码错误" : input.padEnd(4, "_")}
              </p>
              <p className="mt-2 text-xs">
                {phoneStatus === "error" ? "按 C 清除，再试一次" : "输入四位密码，按 # 结束"}
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {keys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleKey(key.split(" ")[0])}
              className="ciw-phone-key px-2 py-3 text-sm font-black"
            >
              {key}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsBackVisible((current) => !current)}
          className="mt-4 w-full rounded-full bg-slate-700 py-2 text-sm font-bold text-gray-100 ring-1 ring-white/10"
        >
          {isBackVisible ? "翻回屏幕" : "翻看背面"}
        </button>
      </div>
      <div className="ciw-gadget-note space-y-3 p-4 text-sm">
        <button
          type="button"
          onClick={() => setShowCodes((current) => !current)}
          className="font-bold text-orange-900 underline"
        >
          长途漫游区号列表
        </button>
        {showCodes && (
          <div className="space-y-2 font-mono">
            <p>USA +872</p>
            <p>JPN +576</p>
            <p>CHN +246</p>
            <p>HKG +454</p>
          </div>
        )}
        <p className="text-xs text-orange-700">
          背面的字母和按键上的字母对应起来，老手机会告诉你答案。
        </p>
      </div>
    </div>
  );
}
