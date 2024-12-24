import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import db from '@/server/db';
import { env } from '@/server/env';

const options: NextAuthOptions = {
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
};

export default options;
