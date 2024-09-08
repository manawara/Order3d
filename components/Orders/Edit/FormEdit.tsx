"use client";
import { z } from "zod";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import RichText from "@/components/RichText/RichText";
import Select from "@/components/Select/Select";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { addOrder, statusOrder } from "@/schema";
import { useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "@/action/order";
import { OrderType } from "@/types/Order.type";
import { UserType } from "@/types/User.type";

const FormEdit = ({
  order,
  users,
}: {
  order: OrderType;
  users: UserType[];
}) => {
  const queryClient = useQueryClient();
  console.log(order);
  const userData =
    users?.map(({ name, id, email }) => ({
      id,
      value: name + "<" + email + ">",
    })) || [];
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<z.infer<typeof addOrder>>({
    defaultValues: {
      productName: order.name as string,
      quantity: order.quantity,
      status: statusOrder[order.status as keyof typeof statusOrder],
      client: order.user.name + "<" + order.user.email + ">",
      price: order.price,
      description: order.description,
    },
    resolver: zodResolver(addOrder),
  });

  const onSubmit = (data: z.infer<typeof addOrder>) => {
    const clientEmail = data.client.match(/<(.+?)>/)?.[1];
    updateOrder({ ...data, userId: order.user_id, orderId: order.id });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    reset();
  };
  return (
    <form
      className="text-greenLight w-1/2 mx-auto mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Nazwa produktu"
        placeholder="Produkt 1"
        {...register("productName")}
      />
      <div className="text-red-600 text-xs">
        <ErrorMessage errors={errors} name="productName" />
      </div>
      <Input
        label="Ilość"
        placeholder="0"
        type="number"
        {...register("quantity", { valueAsNumber: true })}
      />
      <div className="text-red-600 text-xs">
        <ErrorMessage errors={errors} name="quantity" />
      </div>

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            data={[
              { id: 1, value: statusOrder.TODO },
              { id: 2, value: statusOrder.IN_PROGRESS },
              { id: 3, value: statusOrder.DONE },
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
        name="client"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            data={userData}
            label="Klient"
            placeholder="Wybierz Klienta"
          />
        )}
      />
      <div className="text-red-600 text-xs">
        <ErrorMessage errors={errors} name="client" />
      </div>

      <Input
        label="Cena"
        placeholder="np. xx zł"
        type="number"
        {...register("price", { valueAsNumber: true })}
      />
      <div className="text-red-600 text-xs">
        <ErrorMessage errors={errors} name="price" />
      </div>

      <RichText label="Opis" {...register("description")} />
      <div className="flex gap-4 justify-center mt-4">
        <div className="inline-flex">
          <Button>Zapisz zmiany</Button>
        </div>
        <div className="inline-flex">
          <Button onReset={() => reset()}>Odrzuć zmiany</Button>
        </div>
      </div>
    </form>
  );
};

export default FormEdit;