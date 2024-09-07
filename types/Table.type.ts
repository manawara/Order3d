import { statusOrder } from "@/schema";
import { ReactNode } from "react";

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
  action?: React.JSX.Element;
}

export interface HeaderDataProps {
  [key: string]: string;
}

export interface TableHeaderProps {
  data: HeaderDataProps;
}
