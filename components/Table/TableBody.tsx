import { TableBodyType } from "@/types/Table.type";
import React from "react";

const TableBody = ({ data, Component }: TableBodyType) => {
  return (
    <tbody className="w-full">
      {data.map((item) => (
        <tr key={item.name} className="even:bg-gray-800 text-gray-300">
          {Object.entries(item).map(([key, value]) => (
            <td
              key={key}
              className="p-3 text-center  last-of-type:flex last-of-type:justify-center"
            >
              {value}
            </td>
          ))}
          {Component && (
            <td>
              <Component id={item.id} />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
