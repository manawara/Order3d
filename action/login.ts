'use server'
import * as z from 'zod'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { loginSchema, StatusSchema } from '@/schema'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

import { getUserByEmail } from './user'
const loginUser = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }
  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: 'Wprowadziłeś błędne dane!',
    }
  }

  if (existingUser.status === StatusSchema.enum.inactive) {
    return {
      error: 'Konto nie zostało jeszcze zweryfikowane przez administratora!',
    }
  }

  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT })
    return { success: 'Logowanie pomyślne' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Wprowadziłeś błędne dane!' }
        default:
          return { error: 'Upss... Coś poszło nie tak. Spróbuj ponownie' }
      }
    }
    throw error
  }
}

export default loginUser
