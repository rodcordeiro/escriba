import * as z from 'zod';

export const CreateSchema = z.object({
  title: z.string().min(2).max(50),
  text: z.string({ required_error: 'Você deve informar o conteúdo do post' }),
});

export type CreateResponse = {
  title: string;
  text: string;
  owner: {
    id: string;
    createdAt: string;
    updatedAt: string;
    username: string;
  };
  id: string;
  createdAt: string;
  updatedAt: string;
}
