import { getOrderByID } from "@/action/order";
import { getGroupUsers } from "@/action/user";
import FormEdit from "@/components/Orders/Edit/FormEdit";
import React from "react";

const EditOrderID = async ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const users = await getGroupUsers("USER");
  const order = await getOrderByID(id);

  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-bold">
        Edycja zamówienia nr: #{id}
      </h2>
      {order && users && <FormEdit order={order} users={users} />}
    </div>
  );
};

export default EditOrderID;
