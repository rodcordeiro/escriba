import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const HomeScreen = React.lazy(() => import('@/features/Home'));

const routes = createBrowserRouter([{}]);
