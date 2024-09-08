import { TableRowProps } from "@/types/Table.type";
import React from "react";
import DropDownDetails from "../DropDownDetails/DropDownDetails";

const TableBody = ({ data, action }: TableRowProps) => {
  return (
    <tbody className="w-full">
      {data.map((item) => (
        <tr key={item.id} className="even:bg-gray-800 text-gray-300">
          {Object.entries(item).map(([key, value]) => (
            <td
              key={key}
              className="p-3 text-center  last-of-type:flex last-of-type:justify-center"
            >
              {value}
            </td>
          ))}
          {action && (
            <td>
              <DropDownDetails id={item.id} />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
