import React from 'react';
import './style.scss';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import moment from 'moment';

function RepertoireNav({ selectedDate, setSelectedDate }) {
  const handleDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="repertoire__nav">
      <h3>REPERTOIRE</h3>
      <DatePicker
        value={selectedDate}
        onChange={handleDate}
        minDate={new Date()}
        // maxDate={moment().add(7, 'days').toDate()}
      />
    </div>
  );
}
export default RepertoireNav;
