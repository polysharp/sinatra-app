'use client';

import { useForm } from 'react-hook-form';

import { CreateSite, createSite, createSiteSchema } from '@/api';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui';
import { ApiKey, Domain, Site } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { domainAlreadyUsed, domainIsNotVerified } from '@/lib';

export default function CreateSiteDialog({
  workspaceId,
  workspaceDomains,
  workspaceApiKeys,
  workspaceSites,
  open,
  setOpen,
}: {
  workspaceId: string;
  workspaceDomains: Domain[];
  workspaceApiKeys: ApiKey[];
  workspaceSites: Site[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<CreateSite>({
    resolver: zodResolver(createSiteSchema),
    defaultValues: {
      name: '',
      workspaceId,
      domainId: '',
      apiKeyId: '',
    },
  });

  const onSubmit = async (values: CreateSite) => {
    try {
      await createSite(values);
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Create a new site</SheetTitle>
          <SheetDescription>
            Create a new site to start measuring seo performance
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
                      <Input placeholder="Example Website" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domainId"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Domain</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workspaceDomains.map((domain) => (
                          <SelectItem
                            key={domain.id}
                            value={domain.id}
                            disabled={
                              domainIsNotVerified(domain) ||
                              domainAlreadyUsed(domain, workspaceSites)
                            }
                          >
                            {domain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKeyId"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Api Key</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workspaceApiKeys.map((key) => (
                          <SelectItem key={key.id} value={key.id}>
                            {key.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Create site</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
