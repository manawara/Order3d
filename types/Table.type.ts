import { statusOrder } from "@/schema";
import { ReactNode } from "react";
import { PaginationType } from "./Pagination.type";

// Enum for Status
enum Status {
  Todo = "do zrobienia",
  InProgress = "w trakcie",
  Done = "zrealizowany",
}

export type TableType = {
  [key: string]: string | number | null | statusOrder;
};
export interface TableRowProps {
  data: TableType[];
  action?: boolean;
  optionsPagination?: PaginationType;
  dataHeader: HeaderDataProps;
}

export interface HeaderDataProps {
  [key: string]: string;
}

export interface TableHeaderProps {
  data: HeaderDataProps;
}

export interface TableBodyType {
  data: TableType[];
  action?: boolean;
  optionsPagination?: PaginationType;
}
