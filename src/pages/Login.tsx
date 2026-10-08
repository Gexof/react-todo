import { useForm, type SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/InputErrorMessage";
import Input from "../components/ui/Input";
import { LOGIN_FORM } from "../data";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import Button from "../components/ui/Button";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";

interface IFormInput {
  identifier: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });

  // Hanlders
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const { status } = await axiosInstance.post("/auth/local", data);

      if (status === 200) {
        toast.success("You successfully registered your account", {
          position: "bottom-center",
          duration: 4000,
          style: {
            backgroundColor: "white",
            color: "black",
            width: "fit-content",
          },
        });
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const msg = errorObj.response?.data?.error?.message;

      toast.error(`${msg}`, {
        position: "bottom-center",
        duration: 4000,
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Renders
  const renderLoginForm = LOGIN_FORM.map(
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
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mb-6 mt-1 text-sm text-zinc-400">
        Log in to continue to your account.
      </p>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}

        <Button isLoading={isLoading}>Login</Button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?
          <span className="ml-1.5 font-semibold text-indigo-400 transition hover:text-indigo-300 hover:underline">
            Create one
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;
