import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Missing required environment variables GOOGLE_ID and GOOGLE_SECRET");
}

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true, // Make sure to select the role
            password: true,
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          role: user.role, // Return the role
          Key: 'P455W00asrd!@#'
        }
      }
    })
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
  if (account && account.provider === 'google' && user.email && user.name) {
    let tenant = await prisma.tenant.findUnique({
      where: { email: user.email },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: { id: user.id, email: user.email, name: user.name, image: user.image },
      });
    }
  }

  return true;
},
    session: async ({ session, token, user }) => {
      console.log('Session Callback', { session, token })
      if (user) {
        let tenant = await prisma.tenant.findUnique({
          where: { email: user.email },
        });

        if (!tenant) {
          // Check if user.name is defined
          if (!user.name) {
            throw new Error("User name is not defined");
          }

          // Create a new tenant if not exists
          tenant = await prisma.tenant.create({
            data: { id: user.id, email: user.email, name: user.name, image: user.image },
          });
        }

        return {
          ...session,
          user: {
            ...session.user,
            id: tenant.id,
            email: tenant.email,
            name: tenant.name,
          }
        }
      }
      return session
    },
    jwt: async ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }