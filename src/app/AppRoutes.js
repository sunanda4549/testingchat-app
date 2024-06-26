import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));
const UsersChat = lazy(() => import('./chats/UsersChat'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));
const UsersForm = lazy(() => import('./form-elements/UsersForm'));

const BasicTable = lazy(() => import('./tables/BasicTable'));
const UsersTable = lazy(() => import('./tables/UsersTable'));
const ProductsTable = lazy(() => import('./tables/ProductsTable'));
const OrdersTable = lazy(() => import('./tables/OrdersTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));
const ProductsChart = lazy(() => import('./charts/Products'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />
          <Route path="/basic-ui/chats" component={UsersChat} />

          <Route path="/form-Elements/basic-elements" component={BasicElements} />
          <Route path="/form-Elements/users/:id" component={UsersForm} />
          <Route path="/form-Elements/users" component={UsersForm} />

          <Route path="/tables/basic-table" component={BasicTable} />
          <Route path="/tables/users" component={UsersTable} />
          <Route path="/tables/products" component={ProductsTable} />
          <Route path="/tables/orders" component={OrdersTable} />

          <Route path="/icons/mdi" component={Mdi} />

          <Route path="/charts/chart-js" component={ChartJs} />
          <Route path="/charts/products" component={ProductsChart} />


          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;