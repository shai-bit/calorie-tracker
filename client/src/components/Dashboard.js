import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Calendar from 'react-calendar';
import './Dashboard.css';

const Dashboard = (props) => {
  const [value, onChange] = useState(new Date());
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const showCalendar = calendarVisibility ? '' : 'hidden';
  const calendarIcon = calendarVisibility ? 'minus' : 'plus';
  // If calendar value changes, change string date in redux
  useEffect(() => {
    props.getDate(getStringDate(value));
  }, [value]);

  return (
    <div className="dashboard">
      {renderContent(props)}
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

const renderContent = (props) => {
  switch (props.auth) {
    case null:
      return;
    case false:
      return <Redirect to="/" />;
    default:
      return (
        <h1 className="dashboard__header">
          Welcome back <span>{props.auth.name}</span>!
        </h1>
      );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth, date: state.date };
};

export default connect(mapStateToProps, actions)(Dashboard);
