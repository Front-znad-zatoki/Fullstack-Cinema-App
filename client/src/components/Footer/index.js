import { useContext } from 'react';
import './style.scss';
import { CinemaContext } from '../../context/Cinema';

export default function Footer() {
  const { currentCinema } = useContext(CinemaContext);
  return (
    <footer className="footer">
      <ul className="footer__list">
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
