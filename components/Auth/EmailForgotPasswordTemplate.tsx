import { EmailTemplateProps } from '@/types/ForgotPassword.type'

const EmailTemplate = ({ name, token }: EmailTemplateProps) => {
  return `
    <div>
      <h1>Witaj ${name},</h1>
      <p>
        Aby zresetować hasło kliknij ponizszy link:
      </p>
      <a href="http://localhost:3000/reset-password?token=${token}">Zresetuj swoje konto</a>
      <p>Z powazaniem , Obsługa druk 3d </p>
    </div>
  `
}

export default EmailTemplate
