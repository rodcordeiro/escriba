// import { create } from 'zustand';

type Authentication = {
  accessToken: string;
  refreshToken: string;
};
interface AuthStateProps {
  auth: Maybe<Authentication>;
  setAuth: (user: Maybe<Authentication>) => void;
  resetAuth: () => void;
}

// export const useAuthState = create<AuthStateProps>()(set => ({
//   auth: null,
//   setAuth: auth => set(() => ({ auth })),
// }));

export function useAuthState(): AuthStateProps {
  const auth = JSON.parse(String(localStorage.getItem('@escribra::auth')));
  const setAuth = (state: Maybe<Authentication>) =>
    localStorage.setItem('@escribra::auth', JSON.stringify(state));
  const resetAuth = () => localStorage.removeItem('@escribra::auth');
  return { auth, setAuth, resetAuth };
}
