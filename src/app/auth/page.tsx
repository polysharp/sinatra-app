'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import httpClient from '@/lib/http-client';
import { zodResolver } from '@hookform/resolvers/zod';

export const signSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export type Sign = z.infer<typeof signSchema>;

export default function Sign() {
  const form = useForm<Sign>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: Sign) => {
    try {
      await httpClient('/auth/sign', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      window.location.href = 'https://sinatra.polysharp.fr/workspaces';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
                        placeholder="example.com"
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
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
