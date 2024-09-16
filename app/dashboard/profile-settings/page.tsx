import Input from "@/components/Input/Input";
import Image from "next/image";
import React from "react";
import profileIcon from "@/public/profile.svg";
import { auth } from "@/auth";
import FormSettingUser from "@/components/User/FormSettingUser";
import { getUserByID } from "@/action/user";
import email from "next-auth/providers/email";

const ProfileSettingPage = async () => {
  const session = await auth();
  const user = await getUserByID(session?.user?.id as string);

  const userImage = user?.image ? (
    <Image src={user.image} width={90} alt={`icon ${user.name}`} />
  ) : (
    <Image
      src={profileIcon}
      alt="profile logo"
      width={90}
      className="object-cover rounded-full "
    />
  );
  return (
    <div className="mx-auto text-greenLight flex flex-col max-w-screen-md">
      <h2 className="text-center mt-8 text-2xl">Dane użytkownika</h2>
      <div className="flex flex-col items-center justify-center mt-4">
        {userImage} <div className="mt-4 text-xl font-bold">{user?.name}</div>
      </div>
      <FormSettingUser
        user={{ name: user?.name as string, email: user?.email as string }}
      />
    </div>
  );
};

export default ProfileSettingPage;
