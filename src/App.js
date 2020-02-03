import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => {
  const hasToken = () => {
    return (localStorage.getItem('GITBRANCH_TOKEN') && true) || false;
  }

  return (<Switch>
  <Route exact path={'/'} render={() => hasToken() ? <Redirect to={'/dashboard'}/> : <Redirect to={'/login'}/>} />
  <Route exact path={'/login'} render={() => hasToken() ? <Redirect to={'/dashboard'}/> :<Login />} />
  <Route exact path={'/register'} render={() => hasToken() ? <Redirect to={'/dashboard'}/> : <Register />} />
  <Route exact path={'/dashboard'} render={() => hasToken() ? <Dashboard /> : <Redirect to={'/login'}/>} />
</Switch>)
};

export default App;
