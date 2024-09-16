"use client";
import React from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSchema, userRole, userStatus } from "@/schema";
import { Role, UserType } from "@/types/User.type";
import { ErrorMessage } from "@hookform/error-message";
import { updateUser } from "@/action/user";
import useTimeOut from "@/hook/useTimeOut";

export type FormUserType = {
  user: {
    email: string | null;
    name: string | null;
    password: string | null;
    role: userRole;
    status: userStatus;
    id: string;
  };
};

const FormUser = ({ user }: FormUserType) => {
  const {
    control,
    reset,
    register,
    handleSubmit,

    formState: { errors, isSubmitSuccessful },
  } = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      name: user.name as string,
      email: user.email as string,
      password: "",
      status: user.status,
      role: user.role,
    },
  });

  const [showMessage, displayMessage] = useTimeOut("Dane zostały zapisane");
  const handleCancelChange = () => {
    reset();
  };

  const onSubmit = (data: z.infer<typeof UserProfileSchema>) => {
    updateUser({ data, id: user.id });
    displayMessage();
  };
  return (
    <div>
      <form
        className="max-w-xl border border-greenLight p-4 rounded-md mx-auto mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="Nazwa uzytkownika" type="text" {...register("name")} />
        <div className="text-red-600 text-xs">
          <ErrorMessage errors={errors} name="name" />
        </div>
        <Input label="Email" type="email" {...register("email")} />
        <div className="text-red-600 text-xs">
          <ErrorMessage errors={errors} name="email" />
        </div>
        <Input label="Hasło" type="password" {...register("password")} />
        <div className="text-red-600 text-xs">
          <ErrorMessage errors={errors} name="password" />
        </div>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              data={[
                { id: 1, value: userStatus.ACTIVE },
                { id: 2, value: userStatus.INACTIVE },
              ]}
              label="Status"
              placeholder="Wybierz status"
            />
          )}
        />
        <div className="text-red-600 text-xs">
          <ErrorMessage errors={errors} name="status" />
        </div>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              data={[
                { id: 1, value: Role.USER },
                { id: 2, value: Role.ADMIN },
              ]}
              label="Rola uzytkownika"
              placeholder="Wybierz uprawnienia"
            />
          )}
        />
        <div className="text-red-600 text-xs">
          <ErrorMessage errors={errors} name="role" />
        </div>
        <div>
          {isSubmitSuccessful && showMessage && showMessage && (
            <div className="mt-2 text-center text-greenLight">
              {showMessage}
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-5 mx-auto flex-col sm:flex-row">
          <Button type="submit">Zapisz</Button>
          <Button onClick={handleCancelChange} type="button">
            Anuluj zmiany
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormUser;
