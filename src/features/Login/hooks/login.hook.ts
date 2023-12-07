import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../types/login.type';

export function useLoginHook() {
  const [loading, setLoading] = React.useState<boolean>(false);
  type LoginForm = z.infer<typeof loginSchema>;
  const form = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (payload: LoginForm) => {
    
    console.log(payload);
  };
  return {
    loading,
    onSubmit,
    form,
  };
}
