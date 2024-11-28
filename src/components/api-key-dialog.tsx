'use client';

import { useForm } from 'react-hook-form';

import { createApiKey, CreateApiKey, createApiKeySchema } from '@/api';
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui';
import { ApiKey } from '@/interfaces';
import { newestToOldest } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateApiKeyDialog({
  workspaceId,
  workspaceApiKeys,
  open,
  setOpen,
}: {
  workspaceId: string;
  workspaceApiKeys: ApiKey[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<CreateApiKey>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      name: '',
      value: '',
      workspaceId,
    },
  });

  const onSubmit = async (values: CreateApiKey) => {
    try {
      await createApiKey(values);
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Create a new Api Key</SheetTitle>
          <SheetDescription>
            Register a new api key to analyze different sites
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
            autoComplete="off"
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

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Value</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="************" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Create key</Button>
            </div>
          </form>
        </Form>

        <Separator className="mb-4" />

        <Table>
          <TableBody>
            {workspaceApiKeys
              .sort(newestToOldest('createdAt'))
              .map((apiKeys) => (
                <TableRow key={apiKeys.id}>
                  <TableCell className="px-3 py-4">
                    <Badge variant={'outline'} className="whitespace-nowrap">
                      {apiKeys.name}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  );
}
