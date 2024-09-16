import { z } from "zod";
export enum statusOrder {
  TODO = "Do zrobienia",
  IN_PROGRESS = "W toku",
  DONE = "Zrealizowany",
}
// creating a schema for strings
export const loginSchema = z.object({
  email: z.string().min(1, "Email jest wymagany!"),
  password: z.string().min(1, "Hasło jest wymagane!"),
});
export const addOrder = z.object({
  productName: z.string().min(1, "Nazwa produktu jest wymagana!"),
  quantity: z
    .number({
      required_error: "Pole ilość jest wymagane!",
      invalid_type_error: "Pole ilość musi być liczbą!",
    })
    .positive("Ilość sztuk powinna być większa od 0"),
  status: z.nativeEnum(statusOrder).optional(),
  client: z.string().min(1, "Brak nazwy uzytkownika"),
  clientEmail: z.string().optional(),
  description: z.string().optional(),
  price: z
    .number({
      required_error: "Pole kwota jest wymagane!",
      invalid_type_error: "Pole kwota musi być liczbą!",
    })
    .min(1, "Kwota powinna być większa od 0"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email jest wymagany!"),
});
export const registerSchema = z
  .object({
    name: z.string().min(1, "Nazwa uzytkownika wymagana!"),
    email: z.string().email("Nieprawidłowy email"),
    password: z.string().min(1, "Hasło jest wymagane!"),
    confirmPassword: z.string().min(1, "Powtórzenie hasła jest wymagane!"),
  })
  .superRefine((data, ctx) => {
    if (
      data.password !== data.confirmPassword &&
      data.password.length > 0 &&
      data.confirmPassword.length > 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Hasła się różnią!",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Hasła się różnią!",
        path: ["confirmPassword"],
      });
    }
  });

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Hasło musi mieć co najmniej 6 znaków!")
      .max(50, "Hasło może mieć maksymalnie 50 znaków!"),
    repeatPassword: z
      .string()
      .min(6, "Hasło musi mieć co najmniej 6 znaków!")
      .max(50, "Hasło może mieć maksymalnie 50 znaków!"),
  })
  .superRefine((data, ctx) => {
    if (
      data.password !== data.repeatPassword &&
      data.password.length > 0 &&
      data.repeatPassword.length > 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Hasło się różni!",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Hasło się różni!",
        path: ["repeatPassword"],
      });
    }
  });

export const StatusSchema = z.enum(["active", "inactive"]);

export enum userRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum userStatus {
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export const UserProfileSchema = z
  .object({
    name: z.string().min(1, "Nazwa uzytkownika jest wymagana!"),
    email: z.string().email("Nieprawidłowy email"),
    password: z.string().optional(),
    repeatPassword: z.string().optional(),
    status: z.nativeEnum(userStatus).optional(),
    role: z.nativeEnum(userRole).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Hasło się różni!",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Hasło się różni!",
        path: ["repeatPassword"],
      });
    }
  });

export const UserProfileSettingSchema = z
  .object({
    name: z.string().min(1, "Nazwa uzytkownika jest wymagana!"),
    email: z.string().email("Nieprawidłowy email"),
    password: z.string().optional(),
    repeatPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Hasło się różni!",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Hasło się różni!",
        path: ["repeatPassword"],
      });
    }
  });
