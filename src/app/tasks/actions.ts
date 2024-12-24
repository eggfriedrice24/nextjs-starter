'use server';

import { revalidatePath } from 'next/cache';

import { customAlphabet } from 'nanoid';
import { type z } from 'zod';

import { auth } from '@/config/auth';
import { getErrorMessage } from '@/lib/handle-error';
import requireAuth from '@/lib/require-auth';
import db from '@/server/db';
import { tasks, type insertTasksSchema } from '@/server/db/schema/tasks';

export async function createTask(input: z.infer<typeof insertTasksSchema>) {
  await requireAuth();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const session = (await auth())!;

  try {
    const newTask = await db
      .insert(tasks)
      .values({
        code: `TASK-${customAlphabet('0123456789', 4)()}`,
        title: input.title,
        status: input.status,
        label: input.label,
        priority: input.priority,
        userId: session.user.id,
      })
      .returning({
        id: tasks.id,
      });

    return {
      newTask,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  } finally {
    revalidatePath('/tasks');
  }
}
