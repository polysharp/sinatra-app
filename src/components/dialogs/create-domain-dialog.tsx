'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { CreateDomain, createDomain, createDomainSchema } from '@/api';
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
import { useState } from 'react';

export default function CreateWorkspaceDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const form = useForm<CreateDomain>({
    resolver: zodResolver(createDomainSchema),
    defaultValues: {
      name: '',
      workspaceId,
    },
  });

  const onSubmit = async (values: CreateDomain) => {
    try {
      await createDomain(values);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New domain</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new domain</DialogTitle>
          <DialogDescription>
            Register your domain to your workspace so you can use it for new
            sites
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
              <Button type="submit">Create domain</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
