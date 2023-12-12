import { ChaptersTypes } from '@/@types/chapters';
import { api } from '@/lib/api';

export const ListChaptersRequest = async () =>
  api.get<ChaptersTypes.Chapter[]>('/api/v1/posts');
