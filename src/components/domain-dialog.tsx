'use client';

import { Clipboard, RefreshCcw } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
  CreateDomain,
  createDomain,
  createDomainSchema,
  verifyDomain,
} from '@/api';
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
import { Domain, DomainVerificationStatus } from '@/interfaces';
import { newestToOldest, statusToVariant } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateDomainDialog({
  workspaceId,
  workspaceDomains,
  open,
  setOpen,
}: {
  workspaceId: string;
  workspaceDomains: Domain[];
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
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  const isVerified = (domain: Domain) => {
    return domain.verificationStatus === DomainVerificationStatus.VERIFIED;
  };

  const handleCopy = (domain: Domain) => {
    try {
      navigator.clipboard.writeText(domain.verificationKey);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async (domain: Domain) => {
    try {
      await verifyDomain(domain.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-scroll">
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

            <div className="flex justify-end">
              <Button type="submit">Create domain</Button>
            </div>
          </form>
        </Form>

        <Separator className="mb-4" />

        <Table>
          <TableBody>
            {workspaceDomains
              .sort(newestToOldest('createdAt'))
              .map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell className="px-3 py-4">
                    <Badge variant={'outline'}>{domain.name}</Badge>
                  </TableCell>

                  <TableCell className="px-3 py-4">
                    <Badge variant={statusToVariant(domain.verificationStatus)}>
                      {domain.verificationStatus}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-3 py-4">
                    <div className="flex">
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => handleCopy(domain)}
                      >
                        <Clipboard />
                      </Button>

                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => handleVerify(domain)}
                        disabled={isVerified(domain)}
                      >
                        <RefreshCcw />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  );
}
