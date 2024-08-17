import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { db } from './lib/db'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      role?: string
    } & DefaultSession['user']
  }

  interface User {
    role?: string
  }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ token, session }) {
      if (token.role && session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
