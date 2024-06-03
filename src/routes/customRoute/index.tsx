/* eslint-disable react/jsx-props-no-spreading */
import { Route } from 'react-router-dom';
import DefaultLayout from 'layouts/defaultlayout/DefaultLayout';

function CustomRoute({
  component: Component,
  layout: Layout = DefaultLayout,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default CustomRoute;
