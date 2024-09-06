import { InputHTMLAttributes } from "react";

export type InputType = {
  label?: string;
  name?: string;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;
