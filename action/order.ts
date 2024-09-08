"use server";
import { auth } from "../auth";
import { db } from "@/lib/db";
import { addOrder } from "@/schema";
import { z } from "zod";
import { getUserByEmail } from "./user";
import { chooseOrder } from "@/helpers";

export const addNewOrder = async (data: z.infer<typeof addOrder>) => {
  const session = await auth();
  const idUser = await getUserByEmail(data.clientEmail as string).then(
    (user) => user?.id
  );
  if (!session?.user || !idUser) return null;
  const adminId = session.user.id;
  console.log(data);
  const order = db.order.create({
    data: {
      name: data.productName,
      price: data.price,
      description: data.description || "",
      user: { connect: { id: idUser } },
      admin: { connect: { id: adminId } },
      status: chooseOrder(data.status as string),
    },
  });
  return order;
};

export const getOrders = async (currentPage = 0, records = 20) => {
  const [orders, totalCount] = await Promise.all([
    db.order.findMany({
      skip: currentPage * records,
      take: records,
      orderBy: {
        id: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
    db.order.count(),
  ]);

  return { orders, totalCount };
};
