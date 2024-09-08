export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  status: string;
  uid: number;
};
