'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'
import Link from 'next/link'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { loginSchema } from '@/schema'
import loginUser from '@/action/login'

const FormRegister = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      loginUser(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          } else if (data?.success) {
            setSuccess(data.success)
            reset()
          }
        })
        .catch((err) => {
          setError('An unexpected error occurred')
        })
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" type="email" placeholder="test@example.com" {...register('email')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="email" />
      </div>
      <Input label="Password" type="password" placeholder="Twoja nazwa" {...register('password')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="password" />
      </div>
      {error && (
        <div className="text-red-500 text-xs text-center">
          <p>{error}</p>
        </div>
      )}

      <p className="text-greenLight text-xs text-right mt-4">
        <Link href="../auth/forgot-password"> Zapomniałeś hasło? </Link>
      </p>
      <div className="mx-auto mt-8 w-1/2">
        <Button>{isPending ? 'Logowanie...' : 'Zaloguj się'}</Button>
      </div>
      <p className="text-greenLight text-xs text-center mt-4">
        Nie masz konta? <Link href="/auth/register">Zarejestruj się</Link>
      </p>
    </form>
  )
}

export default FormRegister
