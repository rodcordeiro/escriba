'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
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

import { useLoginHook } from './hooks/login.hook';
import { Loading } from '@/components/layout/loading';

const LoginScreen: React.FC = () => {
  const { form, loading, onSubmit } = useLoginHook();
  return (
    <div className="container w-full flex  justify-center h-screen py-20 ">
      <div className="w-full md:w-1/4  flex flex-col align-middle">
        <h1 className="text-center text-2xl mb-10">Bem vindo ao Escriba!</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      className="bg-transparent focus:border-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="bg-transparent"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loading />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
