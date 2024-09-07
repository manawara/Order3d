import HeaderOrder from "@/components/Orders/HeaderOrder";
import Orders from "@/components/Orders/Orders";
import OrdersWrapper from "@/components/Orders/OrdersWrapper";

import React from "react";

const OrdersPage = async () => {
  return (
    <div className="">
      <HeaderOrder />
      <OrdersWrapper>
        <Orders />
      </OrdersWrapper>
    </div>
  );
};

export default OrdersPage;
