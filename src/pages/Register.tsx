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
import { Link, useNavigate } from "react-router";

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
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);

      if (status === 200) {
        toast.success("Your account was created successfully.", {
          position: "bottom-center",
          duration: 4000,
          style: {
            backgroundColor: "#18181b",
            color: "#fafafa",
            border: "1px solid #3f3f46",
            width: "fit-content",
          },
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const msg =
        errorObj.response?.data?.error?.message ??
        "Something went wrong. Please try again.";

      toast.error(msg, {
        position: "bottom-center",
        duration: 4000,
        style: {
          backgroundColor: "#18181b",
          color: "#fafafa",
          border: "1px solid #3f3f46",
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRegisterForm = REGISTER_FORM.map(
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
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Set up your account and make room for what matters.
        </p>
      </div>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex flex-col gap-4">{renderRegisterForm}</div>

        <Button type="submit" isLoading={isLoading} className="mt-1">
          Create account
        </Button>

        <p className="pt-2 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300 focus-visible:outline-none focus-visible:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
