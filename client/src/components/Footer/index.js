import { useContext, useEffect, useState } from 'react';
import './style.scss';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import { CinemaContext } from '../../context/Cinema';
import { ReservationContext } from '../../context/Reservation';

export default function Footer() {
  const history = useHistory();
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { cinemas, currentCinema, setCurrentCinema } = useContext(
    CinemaContext,
  );
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <ul
        className="footer__list"
        style={{ borderTopColor: `${currentTheme.textColor}` }}
      >
        <li className="footer__item">
          <h4 className="footer__item-header">Address</h4>
          <p className="footer__item-detail">
            {currentCinema.country}, {currentCinema.city}
          </p>
          <p className="footer__item-detail">{currentCinema.street}</p>
        </li>
        <li className="footer__item">
          <h4 className="footer__item-header">Contact</h4>
          <a
            href={`mailto:${currentCinema.email}`}
            className="footer__item-detail"
          >
            {currentCinema.email}
          </a>
          <a
            href={`tel:${currentCinema.phone}`}
            className="footer__item-detail"
          >
            {currentCinema.phone}
          </a>
        </li>
        <li className="footer__item">
          <h4 className="footer__item-header">Authors</h4>
          <a href="https://github.com/synowa" className="footer__item-detail">
            Ola
          </a>
          <a
            href="https://github.com/paula0403"
            className="footer__item-detail"
          >
            Paulina
          </a>
          <a
            href="https://github.com/vieraboschkova"
            className="footer__item-detail"
          >
            Weronika
          </a>
        </li>
      </ul>
    </footer>
  );
}
