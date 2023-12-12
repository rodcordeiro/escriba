import { Env } from '@/config/env.config';
declare global {
  export type Value = string | number | symbol;

  export type LooseAutoComplete<T extends Value> = T | object;

  export type Maybe<T> = T | null | undefined;

  namespace NodeJS {
    export interface ProcessEnv extends Env {}
  }
}
