"use server";
import { auth } from "../auth";
import { db } from "@/lib/db";
import { addOrder } from "@/schema";
import { z } from "zod";
import { getUserByEmail } from "./user";
import { chooseOrder } from "@/helpers";
import { OrderFormType } from "@/types/Order.type";
import { revalidatePath } from "next/cache";

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
      description: data.description || "",
      quantity: data.quantity,
      user: { connect: { id: idUser } },
      admin: { connect: { id: adminId } },
      status: chooseOrder(data.status as string),
    },
  });
  return order;
};

export const getOrders = async (
  currentPage = 0,
  records = 20,
  userId: string | undefined | null = undefined
) => {
  let whereClause = {};
  if (userId) {
    whereClause = { user_id: userId };
  }
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
      where: whereClause,
    }),
    db.order.count(),
  ]);

  return { orders, totalCount };
};

export const getOrderByID = async (id: number) => {
  return await db.order.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

export const updateOrder = async (order: OrderFormType) => {
  const updateUser = await db.order.update({
    where: {
      id: order.orderId,
    },
    data: {
      name: order.productName,
      description: order.description,
      quantity: order.quantity,
      price: order.price,
      status: chooseOrder(order.status as string),
      user_id: order.userId,
    },
  });
  revalidatePath("/dashboard/orders/");
};

export const deleteOrder = async (id: number) => {
  await db.order.delete({
    where: {
      id,
    },
  });
};
