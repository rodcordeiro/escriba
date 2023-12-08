import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from '@/stores/auth.store';

import { loginSchema } from '../types/login.type';
import { LoginRequest } from '../api/login.requests';
import { useToast } from '@/components/ui/use-toast';

export function useLoginHook() {
  const [loading, setLoading] = React.useState<boolean>(false);
  type LoginForm = z.infer<typeof loginSchema>;
  const form = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();
  const { setAuth } = useAuthState();
  const { toast } = useToast();

  const onSubmit = async (payload: LoginForm) => {
    setLoading(true);
    await LoginRequest(payload)
      .then(response => {
        if (response.data.authenticated) {
          setAuth({ ...response.data });
          navigate('/');
        }
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      })
      .catch(err => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: err.message,
        });
        console.error(err);
      })
      .finally(() => setLoading(false));
  };
  return {
    loading,
    onSubmit,
    form,
  };
}
