import { getGroupUsers } from "@/action/user";
import Card from "@/components/Card/Card";
import HeaderOrder from "@/components/Orders/HeaderOrder";
import Orders from "@/components/Orders/Orders";
import { Role } from "@/types/User.type";
import React from "react";

const OrdersPage = async () => {
  return (
    <div className="">
      <HeaderOrder />
      <Orders />
    </div>
  );
};

export default OrdersPage;
