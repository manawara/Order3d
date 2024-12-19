import { ComponentType } from "react";
import { PaginationType } from "./Pagination.type";
import { StatusOrder } from "@prisma/client";

// Enum for Status
enum Status {
  Todo = "Przyjęto zamówienie",
  Project = "W fazie projektu",
  InProgress = "Trwa proces druku",
  Done = "Druk gotowy - czekaj na kontakt",
}

export type TableType = {
  [key: string]: string | number | null | StatusOrder;
};
export interface TableRowProps {
  data: TableType[];
  action?: boolean;
  optionsPagination?: PaginationType;
  dataHeader: HeaderDataProps;
  Component?: ComponentType<any>;
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
  Component?: ComponentType<any>;
}
