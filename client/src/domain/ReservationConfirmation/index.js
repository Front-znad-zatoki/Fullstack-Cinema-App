import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import screenigns from '../../mock/screeningsMock';
import { ReservationContext } from '../../context/Reservation';
import { RESET_RESERVATION } from '../../actions/types';
import { AuthContext } from '../../context/Auth';

function ReservationConfirmation({ email }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;

  const history = useHistory();
  const handleProceed = (event) => {
    event.preventDefault();
    dispatchReservation({ type: RESET_RESERVATION });
    history.push(`/`);
  };
  return (
    <div
      className="movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      Rendering Reservation Confirmation
      {/* <ScreeningDetails /> */}
      <h5>Your reservation was made!</h5>
      <p>You should get and email with the confirmation soon!</p>
      <div className="button__group">
        <button onClick={handleProceed}>Back to Main Page</button>
      </div>
    </div>
  );
}

export default ReservationConfirmation;
