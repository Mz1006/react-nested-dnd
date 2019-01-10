import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import wrapper from './components/wrapper';

function RouterConfig({ history }) {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={wrapper} />
        </Switch>
      </Router>
    );
}

export default RouterConfig;
