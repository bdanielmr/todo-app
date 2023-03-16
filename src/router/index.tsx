/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { routes } from './routers';

export default function ViewsRouter() {
  return (
    <Router>
      <Views />
    </Router>
  );
}

function Views() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={`${route.path}`}
          render={(props: any) => <route.component {...props} />}
          exact={route.exact}
        />
      ))}
    </Switch>
  );
}
