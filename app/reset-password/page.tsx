import { checkActivateToken } from '@/action/forgotPassword'
import FormResetPassword from '@/components/Auth/FormResetPassword'
import { ForgotPasswordType, TokenCheckResult } from '@/types/ForgotPassword.type'

import { redirect } from 'next/navigation'
import React from 'react'

const ResetPasswordPage = async (params: ForgotPasswordType) => {
  const tokenObject = params.searchParams

  const isCorrectlyToken = await checkActivateToken(tokenObject)

  if (isCorrectlyToken === null || (typeof isCorrectlyToken === 'object' && 'error' in isCorrectlyToken)) {
    redirect('/auth/login')
  }

  return (
    <div>
      <p className="mb-8">Ustaw nowe hasło dla konta {isCorrectlyToken.email}</p>
      <FormResetPassword email={isCorrectlyToken.email} token={isCorrectlyToken.token} />
    </div>
  )
}

export default ResetPasswordPage
