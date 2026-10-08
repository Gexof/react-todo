import { forwardRef, type InputHTMLAttributes, type Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef(
  ({ label, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
      <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-300">
        <span>{label}</span>
        <input
          ref={ref}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-[15px] text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
          {...rest}
        />
      </label>
    );
  },
);

export default Input;
