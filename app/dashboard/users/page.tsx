"use client";
import { deleteUser, getUsers } from "@/action/user";
import DropDownDetails from "@/components/DropDownDetails/DropDownDetails";
import Table from "@/components/Table/Table";
import { Edit, Eye } from "lucide-react";
import React from "react";
import {
  DropDownItem,
  DropDownWithPropsProps,
} from "@/types/DropDownDetails.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContextPagination } from "@/context/PaginationContext";
import Loader from "@/components/Loader/Loader";
import UserPageWrapper from "@/components/User/UserPageWrapper";
import { useSession } from "next-auth/react";

const dataHeader = {
  id: "ID",
  customer: "Nazwa uzytkownika",
  email: "Email",
  role: "Role",
  status: "Status",
  action: "Akcja",
};

const dataDropDown: DropDownItem[] = [
  {
    link: "/dashboard/users/view/",
    name: "Wyświetl",
    icon: <Eye size={16} />,
  },

  {
    link: "/dashboard/users/edit/",
    name: "Edytuj",
    icon: <Edit size={16} />,
  },
];

const UsersPage = () => {
  const { pageNumber, handleNextPage, handlePrevPage, handleChoosePage } =
    useContextPagination();

  const { data, isLoading } = useQuery({
    queryKey: ["users", pageNumber],
    queryFn: async () => await getUsers(0, 20),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string | number) => {
      return deleteUser(id as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const handleDeleteUser = (id: string | number) => {
    mutation.mutate(id);
  };
  const usersData = data?.users.map(({ id, name, email, role, status }) => ({
    id,
    name,
    email,
    role,
    status,
  }));
  const DropDownDetailsWithProps = (props: DropDownWithPropsProps) => (
    <DropDownDetails
      {...props}
      data={dataDropDown}
      onDelete={handleDeleteUser}
    />
  );

  return (
    <UserPageWrapper>
      {isLoading && <Loader />}
      {usersData && (
        <Table
          data={usersData}
          optionsPagination={{
            postsPerPage: 20, // orders of page
            countData: usersData.length,
            pageNumber,
            handleNextPage,
            handlePrevPage,
            handleChoosePage,
          }}
          dataHeader={dataHeader}
          Component={DropDownDetailsWithProps}
        />
      )}
    </UserPageWrapper>
  );
};

export default UsersPage;
