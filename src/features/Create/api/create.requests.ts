import { api } from '@/lib/api';
import { CreateResponse } from '../types/create.type';

export const CreatePostRequest = async (payload: {
  title: string;
  text: string;
}) => api.post<CreateResponse>('/api/v1/posts', payload);
