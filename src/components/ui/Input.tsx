import { forwardRef, type InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ label, className = "", id, ...rest }, ref) => {
    return (
      <label
        htmlFor={id}
        className="flex flex-col gap-2 text-sm font-medium text-zinc-300"
      >
        <span>{label}</span>

        <input
          ref={ref}
          id={id}
          aria-invalid={rest["aria-invalid"] ?? false}
          className={`w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors duration-150 hover:border-zinc-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 aria-[invalid=true]:border-red-400/70 aria-[invalid=true]:focus:ring-red-400/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...rest}
        />
      </label>
    );
  },
);

Input.displayName = "Input";

export default Input;
