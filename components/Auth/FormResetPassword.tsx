'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '@/schema'
import { z } from 'zod'
import { ErrorMessage } from '@hookform/error-message'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { deleteToken, updatePassword } from '@/action/user'
import Link from 'next/link'
const FormResetPassword = ({ email, token }: { email: undefined | string; token: string }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (email) {
      await updatePassword(email, values.password)
      await deleteToken(token)
    }

    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nowe hasło" type="password" placeholder="******" {...register('password')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="password" />
      </div>
      <Input label="Nowe hasło" type="password" placeholder="******" {...register('repeatPassword')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="repeatPassword" />
      </div>

      {isSubmitSuccessful && (
        <div className="text-greenLight text-xs ">
          <p>
            Hasło zostało zresetowane! <Link href="/auth/login">Zaloguj się</Link>
          </p>
        </div>
      )}
      <div className="max-w-40 mt-4 mx-auto">
        <Button>Ustaw Nowe hasło</Button>
      </div>
    </form>
  )
}

export default FormResetPassword
