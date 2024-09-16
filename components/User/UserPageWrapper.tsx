import PaginationProvider from "@/context/PaginationContext";
import React from "react";

const UserPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <PaginationProvider>{children}</PaginationProvider>;
};

export default UserPageWrapper;
