import { z } from 'zod'

// creating a schema for strings
export const loginSchema = z.object({
  email: z.string().min(1, 'Email jest wymagany!'),
  password: z.string().min(1, 'Hasło jest wymagane!'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email jest wymagany!'),
})
export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nazwa uzytkownika wymagana!'),
    email: z.string().email('Nieprawidłowy email'),
    password: z.string().min(1, 'Hasło jest wymagane!'),
    confirmPassword: z.string().min(1, 'Powtórzenie hasła jest wymagane!'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword && data.password.length > 0 && data.confirmPassword.length > 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hasła się różnią!',
        path: ['password'],
      })
      ctx.addIssue({
        code: 'custom',
        message: 'Hasła się różnią!',
        path: ['confirmPassword'],
      })
    }
  })

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Hasło musi mieć co najmniej 6 znaków!')
      .max(50, 'Hasło może mieć maksymalnie 50 znaków!'),
    repeatPassword: z
      .string()
      .min(6, 'Hasło musi mieć co najmniej 6 znaków!')
      .max(50, 'Hasło może mieć maksymalnie 50 znaków!'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword && data.password.length > 0 && data.repeatPassword.length > 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hasło się różni!',
        path: ['password'],
      })
      ctx.addIssue({
        code: 'custom',
        message: 'Hasło się różni!',
        path: ['repeatPassword'],
      })
    }
  })

export const StatusSchema = z.enum(['active', 'inactive'])