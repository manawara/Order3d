import { getOrderByID } from "@/action/order";
import { getGroupUsers } from "@/action/user";
import FormEdit from "@/components/Orders/Edit/FormEdit";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

const EditOrderID = async ({ params }: Params) => {
  const id = parseInt(params.id, 10); // Ensure `id` is a number
  try {
    const users = await getGroupUsers("USER");
    const order = await getOrderByID(id);

    return (
      <div className="mt-8">
        <h2 className="text-center text-2xl font-bold">
          Edycja zamówienia nr: #{id}
        </h2>
        {order && users ? (
          <FormEdit order={order} users={users} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data", error);
    return <p className="text-center">Error loading order or users data</p>;
  }
};

export default EditOrderID;
