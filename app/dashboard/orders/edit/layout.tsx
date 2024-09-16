import { auth } from "@/auth";
import { Role } from "@/types/User.type";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const OrdersEditLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user?.role === Role.USER) redirect("/dashboard/orders");
  return <div>{children}</div>;
};

export default OrdersEditLayout;
