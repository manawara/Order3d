import { z } from "zod"; // Make sure to import 'z' from 'zod'
import { Role } from "@/types/User.type";
import { getGroupUsers } from "@/action/user";
import FormAddOrder from "./FormAddOrder";
import { useSession } from "next-auth/react";

// Define your schema using Zod
const orderSchema = z.object({
  productName: z.string().nonempty("Nazwa produktu jest wymagana"),
  quantity: z.number().min(1, "Ilość musi być większa niż 0"),
  status: z.string().nonempty("Status jest wymagany"),
  client: z.string().nonempty("Klient jest wymagany"),
  price: z.number().positive("Cena musi być większa niż 0"),
});

const AddOrder = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-center text-xl">Dodaj nowe zamówienie</h3>
      <p className="text-center mt-2">
        Wypełnij formularz, aby utworzyć nowe zamówienie.
      </p>
      <FormAddOrder />
    </div>
  );
};

export default AddOrder;
