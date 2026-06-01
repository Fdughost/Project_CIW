export interface PuzzleProps {
  onSubmit: (answer: string | string[]) => void;
}

export const optionButtonClass =
  "ciw-direction-button px-4 py-3 font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300";
