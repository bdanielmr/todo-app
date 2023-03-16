/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routers';
import { HeaderTasks } from '../components/HeaderTask/HeaderTask';

export default function ViewsRouter() {
  return (
    <Router>
      <HeaderTasks />
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
