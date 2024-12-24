import { sql } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { users } from './users';

export const tasks = pgTable('task', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 128 }).notNull().unique(),
  title: varchar('title', { length: 128 }),
  status: varchar('status', {
    length: 30,
    enum: ['todo', 'in-progress', 'done', 'canceled'],
  })
    .notNull()
    .default('todo'),
  label: varchar('label', {
    length: 30,
    enum: ['bug', 'feature', 'enhancement', 'documentation', 'other'],
  })
    .notNull()
    .default('bug'),
  priority: varchar('priority', {
    length: 30,
    enum: ['low', 'medium', 'high'],
  })
    .notNull()
    .default('low'),
  archived: boolean('archived').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

// Select
export type Task = typeof tasks.$inferSelect;
export const selectTasksSchema = createSelectSchema(tasks);

// Insert
export type NewTask = typeof tasks.$inferInsert;
export const insertTasksSchema = createInsertSchema(tasks)
  .required({
    status: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

// Update
export const patchTasksSchema = insertTasksSchema.partial();
