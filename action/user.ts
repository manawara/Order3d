'use server'
import { registerSchema } from '@/schema'
import * as z from 'zod'
import { signOut } from '@/auth'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { addNewUser } from './register'

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  })
}

export const createUser = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values)
  if (validatedFields.success) {
    const { email, name, password } = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return { error: 'Konto o podanym emailu istnieje!' }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await addNewUser(name, email, hashedPassword)
  }
  return null
}
