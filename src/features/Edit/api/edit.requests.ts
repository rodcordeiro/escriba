import { CreateResponse } from '@/features/Create/types/create.type';
import { api } from '@/lib/api';

export const UpdatePostRequest = async (
  id: string,
  payload: {
    title: string;
    text: string;
  },
) => api.put<CreateResponse>(`/api/v1/posts/${id}`, payload);
export const GetPostRequest = async (id: string) =>
  api.get<CreateResponse>(`/api/v1/posts/${id}`);
