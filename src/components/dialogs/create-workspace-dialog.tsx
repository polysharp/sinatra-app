'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateWorkspace,
  createWorkspace,
  createWorkspaceSchema,
  revalidateWorkspaces,
} from '@/api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateWorkspace>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: CreateWorkspace) => {
    try {
      await createWorkspace(values);
      await revalidateWorkspaces();

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New workspace</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your site analysis
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="example.com" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Create workspace</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
