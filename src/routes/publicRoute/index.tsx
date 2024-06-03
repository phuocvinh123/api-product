import DefaultLayout from 'layouts/defaultlayout/DefaultLayout';
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth } from 'slices/auth';

const PublicRoute: React.FC<RouteProps & { component: any; layout: any }> = ({
  component: Component,
  layout: Layout = DefaultLayout,
  ...rest
}: any) => {
  const { authenticated } = useAuth();

  return (
    <Route
      {...rest}
      exact
      render={(props: any) =>
        !authenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to={{ pathname: '/', state: {} }} />
        )
      }
    />
  );
};

export default PublicRoute;
