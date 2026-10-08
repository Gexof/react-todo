import type { ILoginInput, IRegisterInput } from "../interfaces";

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

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "identifier",
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
