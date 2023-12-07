import { create } from 'zustand';

type Authentication = {
  accessToken: string;
  refreshToken: string;
};
interface AuthStateProps {
  auth: Maybe<Authentication>;
  setAuth: (user: Maybe<Authentication>) => void;
}

export const useAuthState = create<AuthStateProps>()(set => ({
  auth: null,
  setAuth: auth => set(() => ({ auth })),
}));
