"use server";
import { registerSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { addNewUser } from "./register";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UpdateUserType } from "@/types/User.type";
export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};
export const getUserByID = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
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

export const getUsers = async (currentPage = 0, records = 20) => {
  const [users, totalUsers] = await Promise.all([
    db.user.findMany({
      skip: currentPage * records,
      take: records,
      orderBy: {
        id: "desc",
      },
    }),
    db.order.count(),
  ]);
  return { users, totalUsers };
};

export const deleteUser = async (id: string) => {
  await db.order.deleteMany({ where: { user_id: id } });
  await db.order.deleteMany({ where: { admin_id: id } });
  await db.user.delete({ where: { id } });
};

export const updateUser = async (userData: UpdateUserType) => {
  console.log(userData);
  const user = userData.data;
  const userId = userData.id;
  let hashedPassword;
  if (user?.password) {
    hashedPassword = await bcrypt.hash(user.password, 10);
  }

  if (hashedPassword) {
    await db.user.update({
      data: {
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
        password: hashedPassword,
      },
      where: {
        id: userId,
      },
    });
  } else {
    await db.user.update({
      data: {
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
      },
      where: {
        id: userId,
      },
    });
  }
  revalidatePath("/dashboard/users");
};

export const updateProfile = async (user: {
  name: string;
  password?: string | undefined;
  email: string;
}) => {
  let dataUser: { password?: string; name: string } = {
    name: user.name,
  };

  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    dataUser.password = hashedPassword;
  }

  await db.user.update({
    data: dataUser,
    where: { email: user.email },
  });
  revalidatePath("/dashboard/profile-settings");
};
