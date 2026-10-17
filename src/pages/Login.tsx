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
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data,
      );

      console.log(resData);

      if (status === 200) {
        toast.success("You successfully Login", {
          position: "bottom-center",
          duration: 4000,
          style: {
            backgroundColor: "white",
            color: "black",
            width: "fit-content",
          },
        });
      }

      localStorage.setItem("loggedInUser", JSON.stringify(resData));

      setTimeout(() => {
        location.replace("/");
      }, 2000);
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
    ({ name, placeholder, type, validation }) => (
      <div key={name} className="flex flex-col gap-2">
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          label={placeholder}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          {...register(name, validation)}
        />

        {errors[name] && (
          <div id={`${name}-error`}>
            <InputErrorMessage msg={errors[name]?.message} />
          </div>
        )}
      </div>
    ),
  );

  return (
    <div className="flex min-h-[calc(100dvh-64px)] items-center justify-center px-5 py-12">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Sign in to manage your tasks and stay on track.
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-4">{renderLoginForm}</div>

          <Button type="submit" isLoading={isLoading} className="mt-1">
            Sign in
          </Button>

          <p className="pt-2 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <span className="font-medium text-indigo-400">Create one</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
