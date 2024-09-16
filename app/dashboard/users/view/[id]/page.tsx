import UserProfile from "@/components/UserProfile/UserProfile";
import React from "react";

const ViewPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div className="justify-center flex mt-10">
      <UserProfile id={id} />
    </div>
  );
};

export default ViewPage;
