import HomePage from '@/pages/Home';
import { RouteObject } from 'react-router-dom';

export const config: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
];
