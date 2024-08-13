import { useRoutes } from 'react-router-dom';

import Layout from '@/layout';
import { config } from './config';

export const RouterView = () => {
  const routes = useRoutes(config);

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};
