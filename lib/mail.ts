"use server";
import { Resend } from "resend";
import EmailForgotPasswordTemplate from "@/components/Auth/EmailForgotPasswordTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  token: string,
  email: string,
  name: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Obsługa druk 3d <zamowienia@majsterklepka.pro>",
      to: [email],
      subject: "Zresetowanie hasła  - Druk 3d",
      html: EmailForgotPasswordTemplate({
        name,
        token,
      }),
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
