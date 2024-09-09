"use client";
import React from "react";
import Table from "../Table/Table";
import { getOrders } from "@/action/order";
import { formatDate } from "@/helpers";
import { statusOrder } from "@/schema";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { useContextPagination } from "@/context/PaginationContext";

const dataHeader = {
  id: "ID",
  name: "Nazwa towaru",
  customer: "Nazwa klienta",
  date: "Data utworzenia",
  quantity: "Ilość",
  status: "Status",
  action: "Akcja",
};

const Orders = () => {
  const { pageNumber } = useContextPagination();
  const { data, isLoading } = useQuery({
    queryKey: ["orders", pageNumber],
    queryFn: async () => await getOrders(pageNumber, 20),
  });
  const orders = data?.orders;
  const totalCount = data?.totalCount as number;

  const ordersData = orders?.map(
    ({ id, name, createdAt, quantity, status, user }) => ({
      id,
      name,
      user: user.name,
      createdAt: formatDate(createdAt),
      quantity,
      status:
        status === "TODO"
          ? statusOrder.TODO
          : status === "IN_PROGRESS"
          ? statusOrder.IN_PROGRESS
          : statusOrder.DONE,
    })
  );

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl mt-8 mb-2">Zamówienia</h2>
      {isLoading && <Loader />}
      {ordersData && (
        <Table
          data={ordersData}
          optionsPagination={{
            postsPerPage: 20, // orders of page
            countData: totalCount, // count orders
          }}
          dataHeader={dataHeader}
        />
      )}
    </div>
  );
};

export default Orders;
