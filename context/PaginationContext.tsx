import { PaginationContext } from "@/types/Pagination.type";
import React, { createContext, ReactNode, useContext, useState } from "react";

const initialState = {
  handleNextPage: () => {},
  handlePrevPage: () => {},
  handleChoosePage: (page: number) => {},
  pageNumber: 0,
};
const ContextPagination = createContext<PaginationContext>(initialState);
export const useContextPagination = () => {
  const ctx = useContext(ContextPagination);
  if (!ctx) {
    throw new Error(
      "useContextPagination has to be used within <ContextPagination.Provider>"
    );
  }
  return ctx;
};
const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setPageNumber((prev) => prev - 1);
  };
  const handleChoosePage = (page: number) => {
    setPageNumber(page);
  };
  const ctx = {
    pageNumber,
    handleNextPage,
    handlePrevPage,
    handleChoosePage,
  };
  return (
    <ContextPagination.Provider value={ctx}>
      {children}
    </ContextPagination.Provider>
  );
};

export default PaginationProvider;
