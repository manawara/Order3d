import type { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-center items-center h-screen px-8">{children}</div>
}

export default AuthLayout
