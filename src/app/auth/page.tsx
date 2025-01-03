'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { createUser, Sign, signSchema } from '@/api';
import { Logo } from '@/components';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<Sign>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: Sign) => {
    try {
      await createUser(values);

      router.push('/workspaces');
    } catch (err) {
      toast({
        title: "Oups! Houston, we've had a problem",
        description: 'Please try again later',
      });
      console.error(err);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex w-full items-center justify-center pb-4">
          <div className="flex h-12 w-12 items-center justify-center">
            <Logo />
          </div>
        </div>
        <CardTitle className="text-2xl">Sign</CardTitle>
        <CardDescription>
          Enter your email and password below to sign to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        autoComplete="email"
                        placeholder="john@doe.com"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="*****"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="disabled:pointer-events-none"
              disabled={form.formState.isSubmitting}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
