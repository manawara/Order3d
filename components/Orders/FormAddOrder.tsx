"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { getGroupUsers } from "@/action/user";
import { Role } from "@/types/User.type";
import { addOrder, statusOrder, StatusSchema } from "@/schema";
import { ErrorMessage } from "@hookform/error-message";
import { addNewOrder } from "@/action/order";
import RichText from "../RichText/RichText";
const FormAddOrder = () => {
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["users", Role.USER],
    queryFn: () => getGroupUsers(Role.USER),
  });

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
      productName: "",
      status: statusOrder.TODO,
      client: "",
    },
    resolver: zodResolver(addOrder),
  });
  const onSubmit = (data: z.infer<typeof addOrder>) => {
    const clientEmail = data.client.match(/<(.+?)>/)?.[1];
    addNewOrder({ ...data, clientEmail });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      {isSubmitSuccessful && (
        <div className="text-greenLight text-xs text-center my-2 ">
          Zamówienie zostało dodane pomyślnie!
        </div>
      )}
      <div className="mb-2 flex justify-center">
        <div className="inline-flex">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Wysyłanie" : "Dodaj zamówienie"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormAddOrder;
