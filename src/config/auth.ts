import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import db from '@/server/db';
import { env } from '@/server/env';

export const options: NextAuthOptions = {
  pages: {
    signIn: '/',
  },
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, options);
}
