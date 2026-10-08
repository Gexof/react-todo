import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    try {
      const res = await axiosInstance.post("/auth/local/register", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Renders
  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          label={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    ),
  );

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        Create your account
      </h1>
      <p className="mb-6 mt-1 text-sm text-zinc-400">
        It only takes a minute to get started.
      </p>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}

        <Button>Register</Button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?
          <span className="ml-1.5 font-semibold text-indigo-400 transition hover:text-indigo-300 hover:underline">
            Log in
          </span>
        </p>
      </form>
    </>
  );
};

export default Register;
