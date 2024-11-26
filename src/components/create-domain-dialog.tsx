'use client';

import { useForm } from 'react-hook-form';

import { CreateDomain, createDomain, createDomainSchema } from '@/api';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateDomainDialog({
  workspaceId,
  open,
  setOpen,
}: {
  workspaceId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a new domain</SheetTitle>
          <SheetDescription>
            Register your domain to your workspace so you can use it for new
            sites
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
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

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Create domain</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
