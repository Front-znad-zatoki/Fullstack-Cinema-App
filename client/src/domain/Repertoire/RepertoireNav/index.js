import React from 'react';
import './style.scss';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import moment from 'moment';
import CinemaForm from '../../../components/Navbar/CinemaForm';

function RepertoireNav({ selectedDate, setSelectedDate }) {
  const handleDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="repertoire__nav">
      <h2 className="repertoire__nav__title">REPERTOIRE</h2>
      <CinemaForm />
      <div className="repertoire__nav__picker">
        <DatePicker
          className="repertoire__nav__picker__date"
          value={selectedDate}
          onChange={handleDate}
          minDate={new Date()}
          clearIcon={null}
          // maxDate={moment().add(7, 'days').toDate()}
        />
      </div>
    </div>
  );
}
export default RepertoireNav;
