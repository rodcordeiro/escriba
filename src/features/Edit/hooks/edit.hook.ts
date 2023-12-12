import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import { CreateSchema } from '@/features/Create/types/create.type';

import { GetPostRequest, UpdatePostRequest } from '../api/edit.requests';

export function useUpdateHook(id?: string) {
  const [loading, setLoading] = React.useState<boolean>(false);
  type UpdateForm = z.infer<typeof CreateSchema>;
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<UpdateForm>({ resolver: zodResolver(CreateSchema) });

  const onSubmit = async (payload: UpdateForm) => {
    console.log(payload);
    setLoading(true);
    await UpdatePostRequest(id!, payload)
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
  React.useLayoutEffect(() => {
    if (id) {
      GetPostRequest(id)
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: err.message,
          });
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    loading,
    onSubmit,
    form,
  };
}
