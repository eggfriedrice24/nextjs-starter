'use client';

import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus, IconReload } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { tasks } from '@/server/db/schema';
import { insertTasksSchema } from '@/server/db/schema/tasks';

import { createTask } from '../actions';

type CreateTaskSchemaType = z.infer<typeof insertTasksSchema>;

export function CreateTaskForm() {
  const [isPending, startCreateTransition] = React.useTransition();

  const [open, setOpen] = React.useState(false);

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(insertTasksSchema),
    defaultValues: {
      status: 'todo',
      priority: 'medium',
      label: 'bug',
      title: '',
    },
  });

  function onSubmit(input: CreateTaskSchemaType) {
    startCreateTransition(async () => {
      const { error } = await createTask({
        ...input,
      });

      if (error) {
        toast.error(error);
        return;
      }

      form.reset();
      setOpen(false);
      toast.success('Task created');
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-6 border-dashed">
          <IconPlus />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-xs text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title"
                      {...field}
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      value={field.value!}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-xs text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {tasks.status.enumValues.map((item) => {
                            return (
                              <SelectItem
                                key={item}
                                value={item}
                                className="capitalize"
                              >
                                {item}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Label <span className="text-xs text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select Label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {tasks.label.enumValues.map((item) => {
                            return (
                              <SelectItem
                                key={item}
                                value={item}
                                className="capitalize"
                              >
                                {item}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Priority{' '}
                      <span className="text-xs text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {tasks.priority.enumValues.map((item) => {
                            return (
                              <SelectItem
                                key={item}
                                value={item}
                                className="capitalize"
                              >
                                {item}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="archived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Archived</FormLabel>
                    <FormDescription>
                      Mark this task as archived
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending && (
                <IconReload
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Create Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
