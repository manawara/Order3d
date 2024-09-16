"use client";
import React from "react";
import Input from "../Input/Input";
import useTimeOut from "@/hook/useTimeOut";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSettingSchema } from "@/schema";
import { z } from "zod";
import Button from "../Button/Button";
import { ErrorMessage } from "@hookform/error-message";
import { updateProfile } from "@/action/user";
import { FormUserType } from "./FormUser";

const FormSettingUser = ({
  user,
}: {
  user: { name: string; email: string };
}) => {
  console.log(user);
  const {
    control,
    reset,
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserProfileSettingSchema>>({
    resolver: zodResolver(UserProfileSettingSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      repeatPassword: "",
    },
  });

  const [showMessage, displayMessage] = useTimeOut("Dane zostały zapisane");
  const handleCancel = () => {
    reset();
  };
  const onSubmit = async (data: z.infer<typeof UserProfileSettingSchema>) => {
    await updateProfile(data);
    displayMessage();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Imię i nazwisko" {...register("name")} />
        <div className="text-xs text-red-600">
          <ErrorMessage errors={errors} name="name" />
        </div>

        <Input label="Email" disabled {...register("email")} />
        <Input label="Hasło" {...register("password")} type="password" />
        <div className="text-xs text-red-600">
          <ErrorMessage errors={errors} name="password" />
        </div>
        <Input
          label="Powtórz Hasło"
          type="password"
          {...register("repeatPassword")}
        />
        <div className="text-xs text-red-600">
          <ErrorMessage errors={errors} name="repeatPassword" />
        </div>
        <div className="text-center">{showMessage && showMessage}</div>
        <div className="flex max-w-full gap-4 mt-5">
          <Button>{isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}</Button>
          <Button type="button" onClick={handleCancel}>
            Odrzuć zmiany
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormSettingUser;
