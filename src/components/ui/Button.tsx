import type { HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const Button = ({ children, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-[15px] font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
      {...props}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg
          className="mr-3 -ml-1 size-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
