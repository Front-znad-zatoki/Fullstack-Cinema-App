import './style.scss';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../../domain/Landing';
import SignUp from '../../domain/Auth/SignUp';
import Login from '../../domain/Auth/Login';
import MovieList from '../../domain/MovieList';
import Navbar from '../Navbar/index';
import {
  ROUTE_LOGIN,
  ROUTE_MOVIES,
  ROUTE_ROOT,
  ROUTE_SIGNUP,
} from '../../routes';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="App">
          <Route exact path={ROUTE_ROOT} component={Landing} />
          <Switch>
            <Route exact path={ROUTE_MOVIES} component={MovieList} />
            <Route exact path={ROUTE_SIGNUP} component={SignUp} />
            <Route exact path={ROUTE_LOGIN} component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
