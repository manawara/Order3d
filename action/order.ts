"use server";
import { auth } from "../auth";
import { db } from "@/lib/db";
import { addOrder } from "@/schema";
import { z } from "zod";
import { getUserByEmail } from "./user";
import { chooseOrder } from "@/helpers";
import { redirect } from "next/navigation";
export const addNewOrder = async (data: z.infer<typeof addOrder>) => {
  const session = await auth();
  const idUser = await getUserByEmail(data.clientEmail as string).then(
    (user) => user?.id
  );
  if (!session?.user || !idUser) return null;
  const adminId = session.user.id;

  const order = db.order.create({
    data: {
      name: data.productName,
      price: data.price,
      user: { connect: { id: idUser } },
      admin: { connect: { id: adminId } },
      status: chooseOrder(data.status as string),
    },
  });
  return order;
};