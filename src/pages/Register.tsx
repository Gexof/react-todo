import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) });

  // Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);

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

        setTimeout(() => {
          navigate("/login");
        }, 2000);
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

        <Button isLoading={isLoading}>Register</Button>

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
