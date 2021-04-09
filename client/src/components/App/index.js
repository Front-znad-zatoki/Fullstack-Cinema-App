import './style.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../../domain/Landing';
import SignUp from '../../domain/Auth/SignUp';
import Login from '../../domain/Auth/Login';
import MovieList from '../../domain/MovieList';
import { ThemeContext } from '../../context/Theme';
import Navbar from '../Navbar/index';
import MoviesContextProvider from '../../context/Movies';
import AuthContextProvider from '../../context/Auth';
import UserDashboard from '../../domain/User';
import PreBooking from '../../domain/Prebooking';
import MovieView from '../../domain/MovieView';
import ReservationView from '../../domain/ReservationView';
import AdminPanel from '../../domain/AdminPanel';
import ReservationSummary from '../../domain/ReservationSummary';
import ReservationConfirmation from '../../domain/ReservationConfirmation';

function App() {
  const themeHook = useState('light');
  return (
    <AuthContextProvider>
      <ThemeContext.Provider value={themeHook}>
        <MoviesContextProvider>
          <Router>
            <>
              <Navbar />
              <div className="App">
                <Route exact path="/" component={Landing} />
                <Switch>
                  <Route exact path="/movies" component={MovieList} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/login" component={Login} />
                  <Route path="/movies/:movieSlug" component={MovieView} />
                  <Route exact path="/users/me" component={UserDashboard} />
                  <Route
                    path="/prebooking/:screeningId"
                    component={PreBooking}
                  />
                  <Route
                    path="/reservation/seats/:screeningId"
                    component={ReservationView}
                  />
                  <Route
                    path="/reservation/summary/:reservationId"
                    component={ReservationSummary}
                  />
                  {/* <Route path='/reservation/payment/:reservationId' component={ ReservationPayment }/> */}
                  <Route
                    path="/reservation/confirmation"
                    component={ReservationConfirmation}
                  />
                  <Route exact path="/admin" component={AdminPanel} />
                </Switch>
              </div>
            </>
          </Router>
        </MoviesContextProvider>
      </ThemeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
