import { TextareaHTMLAttributes } from "react";

export type RichTextType = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  placeholder?: string;
};
