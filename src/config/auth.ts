import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import db from '@/server/db';
import { env } from '@/server/env';

const options: NextAuthOptions = {
  pages: {
    signIn: '/',
  },
  adapter: DrizzleAdapter(db),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export default options;
