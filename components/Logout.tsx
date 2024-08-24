'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-center py-2 hover:bg-green-600 transition-colors duration-200 cursor-pointer flex justify-center items-center gap-2"
    >
      Wyloguj się
    </button>
  )
}
