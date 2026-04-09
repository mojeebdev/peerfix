import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Google({
    }),
    GitHub({
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = (user as any).role
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
