"use client";
import React from "react";
import Table from "../Table/Table";
import { deleteOrder, getOrders } from "@/action/order";
import { formatDate } from "@/helpers";
import { StatusOrder } from "@/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { useContextPagination } from "@/context/PaginationContext";
import DropDownDetails from "../DropDownDetails/DropDownDetails";
import { Edit, Eye } from "lucide-react";
import {
  DropDownItem,
  DropDownWithPropsProps,
} from "@/types/DropDownDetails.type";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

const dataHeader = {
  id: "ID",
  name: "Nazwa towaru",
  customer: "Nazwa klienta",
  date: "Data utworzenia",
  quantity: "Ilość",
  status: "Status",
  action: "Akcja",
};

const dataDropDown: DropDownItem[] = [
  {
    link: "/dashboard/orders/view/",
    name: "Wyświetl",
    icon: <Eye size={16} />,
  },
  {
    link: "/dashboard/orders/edit/",
    name: "Edytuj",
    icon: <Edit size={16} />,
  },
];

const Orders = () => {
  const { pageNumber, handleNextPage, handlePrevPage, handleChoosePage } =
    useContextPagination();
  const session = useSession();
  const user = session.data?.user;
  const isUser = user?.role === Role.USER ? user.id : null;

  const { data, isLoading } = useQuery({
    queryKey: ["orders", pageNumber, isUser],
    queryFn: async () => await getOrders(pageNumber, 20, isUser),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string | number) => {
      return deleteOrder(id as number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  const handleDeleteOrder = (id: string | number) => {
    mutation.mutate(id);
  };

  const orders = data?.orders;
  const totalCount = data?.orders.length;
  console;
  const ordersData = orders?.map(
    ({ id, name, createdAt, quantity, status, user }) => ({
      id,
      name,
      user: user.name,
      createdAt: formatDate(createdAt),
      quantity: `${quantity} szt`,
      status:
        status === "TODO"
          ? StatusOrder.TODO
          : status === "IN_PROGRESS"
          ? StatusOrder.IN_PROGRESS
          : status === "PROJECT"
          ? StatusOrder.PROJECT
          : StatusOrder.DONE,
    })
  );
  const DropDownWithProps = (props: DropDownWithPropsProps) => (
    <DropDownDetails
      {...props}
      data={dataDropDown}
      onDelete={handleDeleteOrder}
    />
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
            countData: totalCount as number, // count orders
            pageNumber,
            handleNextPage,
            handlePrevPage,
            handleChoosePage,
          }}
          dataHeader={dataHeader}
          Component={DropDownWithProps}
        />
      )}
    </div>
  );
};

export default Orders;
