export type EmailTemplateProps = {
  name: string
  token: string
}

export type ForgotPasswordType = {
  searchParams: string
}

export type TokenCheckResult = { error?: string; email: string; token: string }

export type TokenCheckError = {
  error: string
}
