import NextAuth from 'next-auth'
import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from './script';
import bcrypt from "bcryptjs";

type CredentialsType = {
  email: string;
  password: string;
};

const config = {
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        const { email, password } = credentials as CredentialsType

    
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.hashedPassword
        );
        
        if (!passwordsMatch) {
          return null
        }
        return user;

      }
    })
  ],
  callbacks: {
    authorized: ({ request, auth }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (isTryingToAccessApp && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }
      return false;
    },

    jwt: ({ token, user }) => {
      if (user?.id) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;

      return session;
    },

  }
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);

