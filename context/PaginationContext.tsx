import { PaginationContext } from "@/types/Pagination.type";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

const initialState: PaginationContext = {
  handleNextPage: () => {},
  handlePrevPage: () => {},
  handleChoosePage: (page: number) => {},
  resetPagination: () => {},
  pageNumber: 0,
};

const ContextPagination = createContext<PaginationContext>(initialState);

export const useContextPagination = () => {
  const ctx = useContext(ContextPagination);

  // Assert that ctx is not undefined. This check should not normally be needed,
  // but it's useful for TypeScript's type narrowing.
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

  const resetPagination = () => {
    setPageNumber(0);
  };

  const ctx: PaginationContext = {
    pageNumber,
    handleNextPage,
    handlePrevPage,
    handleChoosePage,
    resetPagination,
  };

  return (
    <ContextPagination.Provider value={ctx}>
      {children}
    </ContextPagination.Provider>
  );
};

export default PaginationProvider;
