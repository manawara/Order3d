import { z } from 'zod'

// creating a schema for strings
export const loginSchema = z.object({
  email: z.string().min(1, 'Email jest wymagany!'),
  password: z.string().min(1, 'Hasło jest wymagane!'),
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
