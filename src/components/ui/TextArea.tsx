import type { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ ...rest }: IProps) => {
  return (
    <textarea
      className="border rounded-lg px-3 w-full"
      rows={6}
      {...rest}
    ></textarea>
  );
};

export default TextArea;
