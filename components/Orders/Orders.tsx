import React from "react";
import Table from "../Table/Table";
import { getOrders } from "@/action/order";
import { getUserByEmail, getUserByID } from "@/action/user";
import { formatDate } from "@/helpers";
import { statusOrder } from "@/schema";
const Orders = async () => {
  const orders = await getOrders();
  const ordersData = orders.map(({ id, name, createdAt, status, user }) => ({
    id,
    name,
    user: user.name,
    createdAt: formatDate(createdAt),

    status:
      status === "TODO"
        ? statusOrder.TODO
        : status === "INPROGRESS"
        ? statusOrder.IN_PROGRESS
        : statusOrder.DONE,
  }));
  return (
    <div className="w-full">
      <h2 className="text-center text-2xl mt-8 mb-2">Zamówienia</h2>
      <Table data={ordersData} />
    </div>
  );
};

export default Orders;
