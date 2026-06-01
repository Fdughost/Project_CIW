import { useState } from "react";
import { Button, Input } from "../ui";
import type { PuzzleProps } from "./_shared";

export function LibraryCardPuzzle({ onSubmit }: PuzzleProps) {
  const [yearDigit, setYearDigit] = useState("");
  const [titleWord, setTitleWord] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isBlankZoomed, setIsBlankZoomed] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    decade: false,
    category: false,
    keyword: false,
  });
  const [message, setMessage] = useState("目录柜里卡片很多，先按借阅卡上的线索缩小范围。");
  const yearDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const directoryEntries = [
    {
      id: "river",
      year: "2003",
      category: "反差",
      keyword: "旅人",
      title: "我用远方报答爱",
      answerWord: "远方",
    },
    {
      id: "general",
      year: "2008",
      category: "反差",
      keyword: "将军",
      title: "我用所有报答爱",
      answerWord: "所有",
    },
    {
      id: "snow",
      year: "2008",
      category: "告别",
      keyword: "将军",
      title: "我用沉默报答爱",
      answerWord: "沉默",
    },
    {
      id: "light",
      year: "2009",
      category: "反差",
      keyword: "诗人",
      title: "我用余光报答爱",
      answerWord: "余光",
    },
  ];

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;
  const visibleEntries = directoryEntries.filter((entry) => {
    if (activeFilters.decade && !entry.year.startsWith("200")) {
      return false;
    }
    if (activeFilters.category && entry.category !== "反差") {
      return false;
    }
    if (activeFilters.keyword && entry.keyword !== "将军") {
      return false;
    }
    return true;
  });

  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters((currentFilters) => ({
      ...currentFilters,
      [filter]: !currentFilters[filter],
    }));
  };

  const selectEntry = (entry: (typeof directoryEntries)[number]) => {
    setSelectedEntryId(entry.id);
    setYearDigit(entry.year.slice(-1));
    setTitleWord(entry.answerWord);

    if (entry.id === "general") {
      setMessage("找到了：年份、类别、主题词都吻合，题名残片正好补成「所有」。");
      return;
    }

    setMessage("这张卡片能补上题名，但至少有一个线索没有对上。");
  };

  return (
    <div className="ciw-library-layout grid gap-5 lg:grid-cols-[1fr_240px]">
      <div
        className={`ciw-library-card ciw-paper-card p-6 transition ${
          isBlankZoomed ? "is-zoomed scale-[1.02]" : ""
        }`}
      >
        <p className="mb-4 text-center font-serif text-2xl font-bold text-amber-900">
          旧借阅卡
        </p>
        <div className="space-y-4 font-serif text-lg text-amber-950">
          <p>
            年份：200
            <button
              type="button"
              onClick={() => setIsBlankZoomed((current) => !current)}
              className="mx-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-amber-300 bg-white/70 font-black text-amber-900"
              title="放大年份空缺"
            >
              {yearDigit || "_"}
            </button>
          </p>
          <p>类别：反差</p>
          <p>主题词：将军</p>
          <p>
            名字：我用{" "}
            <Input
              value={titleWord}
              onChange={(event) => setTitleWord(event.target.value)}
              className="mx-2 inline-flex h-10 w-24 border-amber-300 bg-white/70 text-center text-base font-bold"
              placeholder="__"
            />{" "}
            报答爱
          </p>
        </div>
        <p className="mt-4 rounded-lg bg-white/60 p-3 text-sm font-semibold text-amber-800">{message}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {yearDigits.map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => setYearDigit(digit)}
              className={`ciw-year-wheel-button h-9 w-9 rounded-full font-semibold ${
                yearDigit === digit
                  ? "bg-amber-600 text-white"
                  : "bg-white text-amber-800 ring-1 ring-amber-200"
              }`}
            >
              {digit}
            </button>
          ))}
        </div>
        <Button
          type="button"
          disabled={!yearDigit || !titleWord.trim()}
          onClick={() => onSubmit([yearDigit, titleWord])}
          className="ciw-brass-button mt-6 w-full py-3 disabled:opacity-50"
        >
          补全借阅卡
        </Button>
      </div>
      <div className="ciw-library-cabinet space-y-3 p-4">
        <p className="text-sm font-bold text-amber-100">卡片目录柜</p>
        <div className="ciw-cabinet-drawer-row" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => toggleFilter("decade")}
            className={`ciw-filter-tab rounded-lg px-3 py-2 text-left text-sm font-semibold ${
              activeFilters.decade ? "is-active bg-amber-300 text-amber-950" : "bg-white/10 text-amber-100 ring-1 ring-amber-100/20"
            }`}
          >
            年份：200_
          </button>
          <button
            type="button"
            onClick={() => toggleFilter("category")}
            className={`ciw-filter-tab rounded-lg px-3 py-2 text-left text-sm font-semibold ${
              activeFilters.category ? "is-active bg-amber-300 text-amber-950" : "bg-white/10 text-amber-100 ring-1 ring-amber-100/20"
            }`}
          >
            类别：反差
          </button>
          <button
            type="button"
            onClick={() => toggleFilter("keyword")}
            className={`ciw-filter-tab rounded-lg px-3 py-2 text-left text-sm font-semibold ${
              activeFilters.keyword ? "is-active bg-amber-300 text-amber-950" : "bg-white/10 text-amber-100 ring-1 ring-amber-100/20"
            }`}
          >
            主题词：将军
          </button>
        </div>
        <div className="space-y-2 pt-2">
          {visibleEntries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => selectEntry(entry)}
              className={`ciw-directory-entry w-full rounded-lg border p-3 text-left text-xs shadow-sm transition ${
                selectedEntryId === entry.id
                  ? "is-selected border-amber-500 bg-amber-50"
                  : "border-amber-100 bg-[#fff8e7] hover:border-amber-300"
              }`}
            >
              <span className="block font-bold text-amber-900">
                {entry.year} · {entry.category} · {entry.keyword}
              </span>
              <span className="mt-1 block text-amber-700">
                {activeFilterCount >= 2 || selectedEntryId === entry.id ? entry.title : "题名需继续筛选"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
