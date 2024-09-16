import Image from "next/image";
import React from "react";
import profileIcon from "@/public/profile.svg";
import { AvatarType } from "@/types/UserProfile.type";

const Avatar = ({ image, fullName }: AvatarType) => {
  return (
    <div className="flex items-center gap-8">
      {image ? (
        <Image src={image} width={90} alt={`icon ${fullName}`} />
      ) : (
        <Image
          src={profileIcon}
          alt="profile logo"
          width={90}
          className="object-cover rounded-full"
        />
      )}

      <h2 className="text-2xl text-greenLight">{fullName}</h2>
    </div>
  );
};

export default Avatar;
