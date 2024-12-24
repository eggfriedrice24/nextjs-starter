import { IconCalendar } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import requireAuth from '@/lib/require-auth';
import db from '@/server/db';

export default async function TasksPage() {
  await requireAuth();

  const tasks = await db.query.tasks.findMany({
    orderBy(fields, operators) {
      return operators.desc(fields.createdAt);
    },
    with: {
      user: true,
    },
  });

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Badge variant="outline" className="text-sm">
          {tasks.length} Total
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    task.status === 'done'
                      ? 'default'
                      : task.status === 'in-progress'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {task.status}
                </Badge>
                <time className="flex items-center gap-1 text-sm text-muted-foreground">
                  <IconCalendar className="size-3" />
                  {new Date(task.createdAt).toLocaleDateString()}
                </time>
              </div>
            </CardHeader>

            <CardContent className="px-7 pb-4">
              <CardTitle className="line-clamp-2 text-sm font-medium">
                {task.title}
              </CardTitle>
            </CardContent>

            <CardFooter className="gap-2 pb-4">
              <Avatar className="size-8">
                <AvatarImage src={task.user.image} alt={task.user.name ?? ''} />
                <AvatarFallback>{task.user.name}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {task.user.name}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
