import { faker } from '@faker-js/faker';
import { customAlphabet } from 'nanoid';

import db from '.';
import { tasks, type Task } from './schema/tasks';

export function generateRandomTask(): Omit<Task, 'id'> {
  return {
    code: `TASK-${customAlphabet('0123456789', 4)()}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.shuffle(tasks.status.enumValues)[0] ?? 'todo',
    label: faker.helpers.shuffle(tasks.label.enumValues)[0] ?? 'bug',
    priority: faker.helpers.shuffle(tasks.priority.enumValues)[0] ?? 'low',
    archived: faker.datatype.boolean({ probability: 0.2 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '6c155b12-93ec-4953-b295-bcd0c0246889',
  };
}

export async function seedTasks(input: { count?: number }) {
  const count = input.count ?? 100;

  try {
    const allTasks: Omit<Task, 'id'>[] = [];

    for (let i = 0; i < count; i++) {
      allTasks.push(generateRandomTask());
    }

    await db.delete(tasks);

    console.log('📝 Inserting tasks', allTasks.length);

    await db.insert(tasks).values(allTasks).onConflictDoNothing();
  } catch (err) {
    console.error(err);
  }
}

async function runSeed() {
  console.log('⏳ Running seed...');

  const start = Date.now();

  await seedTasks({ count: 100 });

  const end = Date.now();

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`✅ Seed completed in ${end - start}ms`);

  process.exit(0);
}

// eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
runSeed().catch((err) => {
  console.error('❌ Seed failed');
  console.error(err);
  process.exit(1);
});
