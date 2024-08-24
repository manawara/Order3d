'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { forgotPasswordSchema } from '@/schema'
import { z } from 'zod'
import { ErrorMessage } from '@hookform/error-message'
import { getUserByEmail } from '@/action/user'
import { generateVerificationToken } from '@/action/forgotPassword'
import { sendVerificationEmail } from '@/lib/mail'
const FormForgotPassword = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    const existingUser = await getUserByEmail(values.email)
    if (!existingUser) {
      return { error: 'Email taki  nie istnieje.' }
    }
    try {
      const { token } = await generateVerificationToken(values.email)
      await sendVerificationEmail(token, existingUser.email as string, existingUser.name as string)
      reset()
    } catch (err) {}
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" type="email" placeholder="test@example.com" {...register('email')} />
      <div className="text-red-500 text-xs ">
        <ErrorMessage errors={errors} name="email" />
      </div>
      {isSubmitSuccessful && (
        <p className="text-greenLight text-xs text-center">Prośba o zmianę hasła została wysłana na adres email.</p>
      )}
      <div className="max-w-40 mt-4 mx-auto">
        <Button>{isSubmitting ? 'Przywracanie...' : 'Przywróć hasło'}</Button>
      </div>
    </form>
  )
}

export default FormForgotPassword
