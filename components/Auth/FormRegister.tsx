'use client'
import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import { registerSchema } from '@/schema'
import { createUser } from '@/action/user'

const FormRegister = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await createUser(values).then((data) => {
        if (data?.error) {
          setError(data.error)
        } else if (data?.success) {
          setSuccess(data.success)
          reset()
        }
      })
    } catch (err) {}
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nazwa użytkownika" type="text" placeholder="Twoja nazwa" {...register('name')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="name" />
      </div>
      <Input label="Email" type="email" placeholder="test@example.com" {...register('email')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="email" />
      </div>
      <Input label="Hasło" type="password" placeholder="******" {...register('password')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="password" />
      </div>
      <Input label="Powtórz hasło" type="password" placeholder="******" {...register('confirmPassword')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="confirmPassword" />
      </div>
      {error && (
        <div className="text-red-500 text-xs ">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="text-greenLight text-sm text-center">
          <p>{success}</p>
        </div>
      )}
      <div className="mx-auto mt-8 w-1/2">
        <Button>{isPending ? 'Rejestracja trwa...' : 'Zarejestruj się'}</Button>
      </div>
      <p className="text-greenLight text-xs text-center mt-4">
        Masz juz konto? <Link href="/auth/login">Zaloguj się</Link>
      </p>
    </form>
  )
}

export default FormRegister
