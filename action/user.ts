"use server";
import { registerSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { addNewUser } from "./register";
import { Role } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getGroupUsers = async (role: Role) => {
  return await db.user.findMany({
    where: {
      role,
    },
  });
};

export const getTokenByEmail = async (email: string) => {
  return await db.verificationToken.findFirst({
    where: {
      email,
    },
  });
};

export const deleteToken = async (token: string) => {
  return await db.verificationToken.delete({
    where: { token },
  });
};
export const createUser = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (validatedFields.success) {
    const { email, name, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "Konto o podanym emailu istnieje!" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await addNewUser(name, email, hashedPassword);
    return { success: "Konto zostało stworzone!" };
  }
  return null;
};

export const updatePassword = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    data: {
      password: hashedPassword,
    },
    where: {
      email,
    },
  });
};
