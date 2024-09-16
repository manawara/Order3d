"use client";
import React from "react";
import Button, { ButtonLink } from "../Button/Button";
import { UserContentType } from "@/types/UserProfile.type";
import { deleteUser } from "@/action/user";
import useTimeOut from "@/hook/useTimeOut";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const UserContent = ({ id, name, email, role, status }: UserContentType) => {
  const [showMessage, displayMessage] = useTimeOut(
    "Uzytkownik został usunięty"
  );
  const mutation = useMutation({
    mutationKey: ["users", id],
    mutationFn: async () => await deleteUser(id as string),
  });
  const handleDeleteUser = async () => {
    mutation.mutate();
    displayMessage();
    redirect("/dashboard/users");
  };
  return (
    <div>
      <ul className="flex flex-col gap-4 mt-8 text-xl text-greenLight">
        <li>Nazwa uzytkownika: {name}</li>
        <li>Email: {email}</li>
        <li>Role: {role}</li>
        <li>Status: {status}</li>
        <li className="flex gap-4 mt-4">
          <Button onClick={handleDeleteUser}>Usuń</Button>
          <ButtonLink link={`/dashboard/users/edit/${id}`}>Edytuj</ButtonLink>
        </li>
        {showMessage && <li>Uzytkownik został usunięty!</li>}
      </ul>
    </div>
  );
};

export default UserContent;
