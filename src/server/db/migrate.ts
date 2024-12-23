import { migrate } from 'drizzle-orm/postgres-js/migrator';

import config from '@/../drizzle.config';
import { env } from '@/server/env';

import db, { client } from './index';

export async function runMigrate() {
  if (!env.DB_MIGRATING) {
    throw new Error('You must set DB_MIGRATING to true.');
  }

  console.log('⏳ Running migrations...');

  const start = Date.now();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await migrate(db, { migrationsFolder: config.out! });

  const end = Date.now();

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`✅ Migrations completed in ${end - start}ms`);

  await client.end();
}

// eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
