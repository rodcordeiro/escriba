import axios from 'axios';
import { ENV_VARIABLES } from '@/config/env.config';
import { useAuthState } from '@/stores/auth.store';

const api = axios.create({
  baseURL: ENV_VARIABLES.VITE_API_URL,
});

api.interceptors.request.use(req => {
  const { auth } = useAuthState();
  if (auth?.accessToken)
    req.headers['Authorization'] = `Bearer ${auth.accessToken}`;
  return req;
});

export { api };
