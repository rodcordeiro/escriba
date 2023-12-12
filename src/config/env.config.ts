import { z } from 'zod';

export const envSchema = z.object({
  VITE_ENV: z
    .union([z.literal('dev'), z.literal('prod')])
    .optional()
    .default('dev'),
  VITE_API_URL: z.string().default('http://localhost:3333'),
});

export type Env = z.infer<typeof envSchema>;
const parsed = envSchema.parse(import.meta.env);

export const ENV_VARIABLES: Env = {
  ...parsed,
};
