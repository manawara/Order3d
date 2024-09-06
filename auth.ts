import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      role?: string;
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    id?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.role && session.user) {
        session.user.role = token.role;
        session.user.id = token.id || "";
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 86400 },
  ...authConfig,
});
