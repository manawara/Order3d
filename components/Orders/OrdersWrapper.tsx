"use client";

import PaginationProvider from "@/context/PaginationContext";
import { ReactNode } from "react";

function OrdersWrapper({ children }: { children: ReactNode }) {
  return <PaginationProvider>{children}</PaginationProvider>;
}

export default OrdersWrapper;
