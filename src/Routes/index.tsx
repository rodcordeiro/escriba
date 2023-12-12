import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { Layout } from './layout';
import { useAuthState } from '@/stores/auth.store';

const LoginScreen = React.lazy(() => import('@/features/Login'));
const HomeScreen = React.lazy(() => import('@/features/Home'));
const CreateScreen = React.lazy(() => import('@/features/Create'));
const EditScreen = React.lazy(() => import('@/features/Edit'));

export const Routes = () => {
  const { auth } = useAuthState();
  console.log({ auth });
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      loader: () => (!auth?.accessToken ? redirect('/login') : null),
      children: [
        {
          path: '/',
          element: <HomeScreen />,
        },
        {
          path: '/post',
          element: <CreateScreen />,
        },
        {
          path: '/post/:id?',
          element: <EditScreen />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginScreen />,
    },
  ]);

  return <RouterProvider router={routes} />;
};
