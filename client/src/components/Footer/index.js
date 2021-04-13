import { useContext } from 'react';
import './style.scss';
import { CinemaContext } from '../../context/Cinema';

export default function Footer() {
  const { currentCinema } = useContext(CinemaContext);
  return (
    <footer className="footer">
      <ul className="footer__list">
        <a href="https://coderscamp.edu.pl/" className="footer__item-detail">
          <h5 className="footer__header">CODERSCAMP 2020</h5>
        </a>
        <li className="footer__item">
          <h6 className="footer__item-header">Address</h6>
          <p className="footer__item-detail">
            {currentCinema.country}, {currentCinema.city}
          </p>
          <p className="footer__item-detail">{currentCinema.street}</p>
          <p className="footer__item-detail">
            {`${currentCinema.hours.open}:00 - ${currentCinema.hours.close}:00`}
          </p>
        </li>
        <li className="footer__item">
          <h6 className="footer__item-header">Contact</h6>
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
          <h6 className="footer__item-header">Authors</h6>
          <a href="https://github.com/synowa" className="footer__item-detail">
            <span className="fab fa-github" />
            Ola
          </a>
          <a
            href="https://github.com/paula0403"
            className="footer__item-detail"
          >
            <span className="fab fa-github" />
            Paulina
          </a>
          <a
            href="https://github.com/vieraboschkova"
            className="footer__item-detail"
          >
            <span className="fab fa-github" />
            Weronika
          </a>
        </li>
      </ul>
    </footer>
  );
}
