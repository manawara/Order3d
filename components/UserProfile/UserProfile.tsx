import React, { Suspense } from "react";
import Avatar from "../Avatar/Avatar";
import UserContent from "./UserContent";
import { getUserByID } from "@/action/user";
const UserProfile = async ({ id }: { id: string }) => {
  const user = await getUserByID(id);

  return (
    <section className="flex items-center flex-col  border py-4 px-12 rounded border-greenLight">
      <Avatar fullName={user?.name} image={user?.image} />
      <UserContent
        id={user?.id}
        name={user?.name}
        email={user?.email}
        status={user?.status}
        role={user?.role}
      />
    </section>
  );
};

export default UserProfile;
