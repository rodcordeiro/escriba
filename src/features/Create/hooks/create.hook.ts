import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CreateSchema } from '../types/create.type';
// import { LoginRequest } from '../api/login.requests';
import { useToast } from '@/components/ui/use-toast';
import { CreatePostRequest } from '../api/create.requests';

export function useCreateHook() {
  const [loading, setLoading] = React.useState<boolean>(false);
  type CreateForm = z.infer<typeof CreateSchema>;
  const form = useForm<CreateForm>({ resolver: zodResolver(CreateSchema) });
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (payload: CreateForm) => {
    console.log(payload);
    setLoading(true);
    await CreatePostRequest(payload)
      .then(({ data }) => {
        //     if (response.data.authenticated) {
        //       setAuth({ ...response.data });
        //       navigate('/');
        //     }
        toast({
          title: 'Post criado!!',
          description: `Post: ${data.title}`,
        });
        setTimeout(() => navigate(`/`), 1500);
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
