'use server'
import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { getTokenByEmail } from './user'
import { TokenCheckResult, TokenCheckError } from '@/types/ForgotPassword.type'
export const generateVerificationToken = async (email: string) => {
  try {
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const token = uuidv4()
    const existingToken = await getTokenByEmail(email)
    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          email: existingToken.email,
          token: existingToken.token,
        },
      })
    }
    const newToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    })
    return newToken
  } catch (error) {
    throw error
  }
}

export const checkActivateToken = async (tokenObj: any): Promise<TokenCheckResult | TokenCheckError> => {
  const userToken = await db.verificationToken.findFirst({
    where: { token: tokenObj.token },
  })

  if (userToken) {
    if (userToken.expires > new Date()) {
      return { email: userToken.email, token: userToken.token }
    } else {
      return { error: 'Link wygasł! Spróbuj zresetować hasło jeszcze raz' }
    }
  } else {
    return { error: 'Błędny link' }
  }
}
