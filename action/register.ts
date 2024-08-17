'use server'
import { db } from '@/lib/db'

export const addNewUser = async (name: string, email: string, password: string) => {
  const addUser = db.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  return addUser
}
