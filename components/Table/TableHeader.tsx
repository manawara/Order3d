import { TableHeaderProps } from "@/types/Table.type";
import React from "react";

export const TableHeader = ({ data }: TableHeaderProps) => {
  return (
    <thead>
      <tr className="bg-green">
        {Object.entries(data).map(([key, value]) => (
          <th key={key} className="p-3">
            {value}
          </th>
        ))}
      </tr>
    </thead>
  );
};
