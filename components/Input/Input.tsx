"use client";
import { forwardRef } from "react";
import { InputType } from "@/types/Input.type";

const Input = forwardRef<HTMLInputElement, InputType>(
  ({ label, name, placeholder, ...rest }, ref) => {
    return (
      <div className="flex flex-col my-2">
        <label className="text-xs" htmlFor={name}>
          {label}
        </label>
        <input
          className="p-2 py-3 mt-1 rounded-md bg-green text-xs"
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
Input.displayName = "Input";
export default Input;
