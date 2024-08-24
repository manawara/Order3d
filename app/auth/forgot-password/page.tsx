import React from 'react'
import Link from 'next/link'
import FormForgotPassword from '@/components/Auth/FormForgotPassword'

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="absolute top-4 right-10">
        <div className="flex justify-between gap-4 text-greenLight">
          <Link href="/auth/login" className="hover:text-white">
            Zaloguj
          </Link>
          <Link href="/auth/register" className="hover:text-white">
            Rejestracja
          </Link>
        </div>
      </div>
      <div className="sm:w-1/2">
        <h1 className="text-2xl text-center">Przypomnij hasło</h1>
        <FormForgotPassword />
      </div>
    </>
  )
}

export default ForgotPasswordPage
