import { defineConfig } from 'drizzle-kit';

import { env } from '@/server/env';

export default defineConfig({
  schema: './src/server/db/schema/index.ts',
  dialect: 'postgresql',
  out: './src/server/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
