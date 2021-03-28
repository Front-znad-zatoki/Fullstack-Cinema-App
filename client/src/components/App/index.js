import './style.scss';
import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../../domain/Landing';
import SignUp from '../../domain/Auth/SignUp';
import Login from '../../domain/Auth/Login';
import MovieList from '../../domain/MovieList';
import MovieView from '../../domain/MovieView';
import { ThemeContext } from '../../context/Theme';
import Navbar from '../Navbar/index';
import MovieDetails from '../../domain/MovieDetails/index';
import MovieSlider from '../../domain/MovieSlider';
import MoviesContextProvider from '../../context/Movies';
import moviesMock from '../../mock/moviesMock';

function App() {
  const themeHook = useState('light');
  return (
    <ThemeContext.Provider value={themeHook}>
      <MoviesContextProvider>
        <Router>
          <>
            <Navbar />
            {/* <MovieDetails movie={moviesMock.currentlyPlaying[0]} /> */}
            <div className="App">
              <Route exact path="/" component={Landing} />
              <Switch>
                {/* http://localhost:3000/movies */}
                <Route exact path="/movies" component={MovieList} />
                {/* http://localhost:3000/movies/id */}
                <Route exact path="/movies/:title" component={MovieView} />
                {/* http://localhost:3000/signup */}
                <Route exact path="/signup" component={SignUp} />
                {/* http://localhost:3000/login */}
                <Route exact path="/login" component={Login} />
                {/* http://localhost:3000/logout */}
                {/* <Route exact path='/login' component={ Logout }/> */}
                {/* http://localhost:3000/users/me */}
                {/* <Route exact path='/users/me' component={ UserProfile }/> */}
                {/* http://localhost:3000/reservation/pre/:screeningId */}
                {/* <Route path='/reservation/pre/:screeningId' component={ ReservationPreview }/> */}
                {/* http://localhost:3000/reservation/chooseSeats/:screeningId */}
                {/* <Route path='/reservation/chooseSeats/:screeningId' component={ ReservationDetails }/> */}
                {/* http://localhost:3000/reservation/details/:reservationId */}
                {/* <Route path='/reservation/details/:reservationId' component={ ReservationConfirmation }/> */}
                {/* http://localhost:3000/reservation/payment/:reservationId */}
                {/* <Route path='/reservation/payment/:reservationId' component={ ReservationPayment }/> */}
                {/* http://localhost:3000/reservation/confirm/:reservationId */}
                {/* <Route path='/reservation/confirm/:reservationId' component={ ReservationConfirmation }/> */}
                {/* <PrivateRoute exact path='/admin' component={ Admin }/> */}
                {/* http://localhost:3000/admin */}
              </Switch>
            </div>
          </>
        </Router>
      </MoviesContextProvider>
    </ThemeContext.Provider>
  );
}

export default App;
