import { userRole, userStatus } from "@/schema";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum Status {
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  status: "active" | "inactive";
  role: Role; // Add this line if 'role' should be part of UserType
  uid: number;
};

export type UpdateUserType = {
  data: {
    name: string | null;
    email: string;
    password?: string | undefined;
    status?: userStatus;
    role?: userRole | undefined; // Ensure it's the same type
  };
  id: string;
};
