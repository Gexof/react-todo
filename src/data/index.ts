import type { IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    validation: { required: true, minLength: 5 },
  },

  {
    name: "email",
    placeholder: "Email",
    type: "text",
    validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  },

  {
    name: "password",
    placeholder: "Password",
    type: "text",
    validation: { required: true, minLength: 8 },
  },
];
