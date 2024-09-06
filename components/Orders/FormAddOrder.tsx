"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { getGroupUsers } from "@/action/user";
import { Role } from "@/types/User.type";
import { addOrder, statusOrder } from "@/schema";
const FormAddOrder = () => {
  const { data: users } = useQuery({
    queryKey: ["users", Role.USER],
    queryFn: () => getGroupUsers(Role.USER),
  });
  if (users) {
  }
  const userData = users?.map(({ name, id }) => ({ id, value: name }));

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof addOrder>>({
    defaultValues: {
      productName: "",
      status: statusOrder.toDO,
      client: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addOrder>) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nazwa produktu"
        placeholder="Produkt 1"
        {...register("productName")}
      />
      <Input
        label="Ilość"
        placeholder="0"
        type="number"
        {...register("quantity")}
      />
      <Select
        data={[
          {
            id: 1,
            value: "Do zrobienia",
          },
          {
            id: 2,
            value: "W toku",
          },
          {
            id: 3,
            value: "Zrobione",
          },
        ]}
        label="Status"
        placeholder="Wybierz status"
        {...register("status")}
      />
      <Select
        data={userData || []}
        label="Klient"
        placeholder="Wybierz Klienta"
        {...register("client")}
      />
      <Input
        label="Cena"
        placeholder="np. xx zł"
        type="number"
        {...register("price")}
      />
      <div className="my-4">
        <Button disabled={isSubmitting}>Dodaj zamówienie</Button>
      </div>
    </form>
  );
};

export default FormAddOrder;
