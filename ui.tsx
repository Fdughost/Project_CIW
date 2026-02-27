import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
        className
      }
      {...props}
    />
  );
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={
        "flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
        className
      }
      {...props}
    />
  );
}

