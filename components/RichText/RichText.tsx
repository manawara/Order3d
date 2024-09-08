"use client";
import { forwardRef } from "react";
import { RichTextType } from "@/types/RichText.type";
const RichText = forwardRef<HTMLTextAreaElement, RichTextType>(
  ({ label, name, placeholder, ...rest }, ref) => {
    return (
      <div className="flex flex-col my-2">
        <label className="text-xs" htmlFor={name}>
          {label}
        </label>
        <textarea
          className="p-2 py-3 mt-1 rounded-md bg-green text-xs h-22 resize-none"
          placeholder={placeholder}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
RichText.displayName = "RichText";
export default RichText;
