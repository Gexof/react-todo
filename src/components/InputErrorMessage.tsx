interface IProps {
  msg?: string;
}

const InputErrorMessage = ({ msg }: IProps) => {
  return msg ? <span className="text-sm text-red-900">{msg}</span> : null;
};

export default InputErrorMessage;
