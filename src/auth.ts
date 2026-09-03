import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Find user in database
        let user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        const isValidPassword = credentials.password === process.env.ADMIN_PASSWORD;

        if (!isValidPassword) return null;

        // Auto-seed admin if valid password but user doesn't exist
        if (!user && credentials.email === "admin@vagas.com") {
          user = await prisma.user.create({
            data: {
              name: "Admin",
              email: "admin@vagas.com",
              role: "ADMIN"
            }
          });
        }

        if (user) {
          return { id: user.id, name: user.name, email: user.email, role: user.role }
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: unknown }).role = token.role;
      }
      return session;
    }
  }
})
