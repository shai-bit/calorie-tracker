import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import * as actions from '../actions';

const CurrentDate = (props) => {
  const [value, onChange] = useState(new Date());
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const showCalendar = calendarVisibility ? '' : 'hidden';
  const calendarIcon = calendarVisibility ? 'minus' : 'plus';
  // If calendar value changes, change string date in redux
  useEffect(() => {
    props.getDate(getStringDate(value));
  }, [value]);

  return (
    <div className="dashboard__calendar">
      <h2 className="dashboard__calendar--date">
        {value.toDateString()}
        <i
          class={`far fa-calendar-${calendarIcon}`}
          onClick={() => setCalendarVisibility(!calendarVisibility)}
        />
      </h2>
      <Calendar
        className={`${showCalendar}`}
        value={value}
        onChange={onChange}
        locale={'en-US'}
      />
    </div>
  );
};
// Returns date as string
const getStringDate = (date) => {
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  var fullDate = '' + year + month + day;
  return fullDate;
};

const mapStateToProps = ({ date }) => {
  return { date };
};

export default connect(mapStateToProps, actions)(CurrentDate);
