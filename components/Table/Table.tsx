import React from "react";
import { TableHeader } from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import DropDownDetails from "../DropDownDetails/DropDownDetails";
import { TableRowProps } from "@/types/Table.type";
import Pagination from "../Pagination/Pagination";
import { PaginationType } from "@/types/Pagination.type";

const Table = ({ data, optionsPagination, dataHeader }: TableRowProps) => {
  return (
    <div className="overflow-x-auto w-full text-greenLight  text-sm p-2">
      <table className="min-w-[600px]  sm:min-w-[800px] lg:min-w-full  overflow-x-auto overflow-y-scroll">
        <TableHeader data={dataHeader} />
        <TableBody data={data} action />
        <TableFooter>
          <Pagination {...(optionsPagination as PaginationType)} />
        </TableFooter>
      </table>
    </div>
  );
};

export default Table;
