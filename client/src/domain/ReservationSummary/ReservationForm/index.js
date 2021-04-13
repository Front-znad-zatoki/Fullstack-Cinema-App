import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReservationContext } from '../../../context/Reservation';
import { AuthContext } from '../../../context/Auth';
import { loadUser } from '../../../actions/Auth';
import { placeOrder } from '../../../actions/Reservation';
import CustomLoader from '../../../components/Loader';

function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { selectedSeats } = reservation;
  const { _id } = reservation.screening;
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { user } = userContext;
  const history = useHistory();
  const [formData, setFormData] = useState({
    status: 'pending',
    screening: _id,
    ticketsData: selectedSeats,
    email: user && user.email ? user.email : '',
    // phone: user.phone ? user.phone : '',
  });

  useEffect(() => {
    setLoading(true);
    if (user.id && !user.email) {
      loadUser(dispatchUserContext, setLoading);
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    setFormData({
      ...formData,
      user: user.id || '',
      email: user && user.email ? user.email : '',
    });
  }, [user]);

  const { email, phone } = formData;

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const wasPlaced = await placeOrder(
      formData,
      dispatchReservation,
      setLoading,
    );
    if (!wasPlaced) {
      alert('Could post order. Try again');
      return;
    }
    setLoading(false);
    history.push('/reservation/confirmation');
  };
  const handleGoBack = (event) => {
    event.preventDefault();
    history.push(`/reservation/seats/${_id}`);
  };
  if (loading) return <CustomLoader />;

  return (
    <form className="reservation__form" onSubmit={onSubmit}>
      <h5>INSERT CORRECT EMAIL</h5>
      <label htmlFor="reservationEmail" className="auth__form-group">
        <input
          type="email"
          id="reservationEmail"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </label>
      <div className="button__group">
        <button className="button--submit" onClick={handleGoBack}>
          Go Back
        </button>
        <button type="submit" className="button--submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
