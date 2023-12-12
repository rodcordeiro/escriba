import { api } from '@/lib/api';
import { LoginResponse } from '../types/login.type';

export const LoginRequest = async (payload: {
  username: string;
  password: string;
}) => api.post<LoginResponse>('/api/v1/auth/login', payload);
