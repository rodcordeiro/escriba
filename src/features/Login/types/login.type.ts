import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});

export type LoginResponse = {
  accessToken: string;
  expires: number;
  refreshToken: string;
  authenticated: boolean;
};
