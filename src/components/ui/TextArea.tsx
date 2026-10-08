import type { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ ...rest }: IProps) => {
  return <textarea rows={6} {...rest}></textarea>;
};

export default TextArea;
