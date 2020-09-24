import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const DaysTotal = (props) => {
  const [todaysDate, setDate] = useState(null);
  const { fetchedPosts, setCalorieSum } = props;
  // Makes sure to reset calorie count if no posts yet
  useEffect(() => {
    if (fetchedPosts === '') {
      setCalorieSum({ breakfast: 0, lunch: 0, dinner: 0, snacks: 0 });
    }
  }, [fetchedPosts, setCalorieSum]);

  // Set date on every re render
  useEffect(() => {
    setDate(getStringDate());
  });

  return (
    <React.Fragment>
      {renderContent(todaysDate, props, getTotal)}
    </React.Fragment>
  );
};

const renderContent = (todaysDate, props, getTotal) => {
  if (props.auth === null) return;
  const { goal } = props.auth;
  const { date, calorieSums } = props;
  const total = getTotal(calorieSums);
  console.log('today:', todaysDate, 'date:', date);
  if (todaysDate === date) {
    if (goal === 0) {
      return (
        <div className="day-total">
          Goal:{' '}
          <span onClick={async () => await props.updateGoal({ goal: 2000 })}>
            {goal}
          </span>{' '}
          - Total: {total} = 0
        </div>
      );
    }
    return (
      <div className="day-total">
        Goal:{' '}
        <span onClick={() => props.updateGoal({ goal: 2000 })}>{goal}</span> -
        Total: {total} = {goal - total}
      </div>
    );
  }
  return <div className="day-total">Total: {total} kcal</div>;
};

// Returns date as string
const getStringDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  var fullDate = '' + year + month + day;
  return fullDate;
};

const getTotal = (calorieSums) => {
  const { breakfast, lunch, dinner, snacks } = calorieSums;
  let total = breakfast + lunch + dinner + snacks;
  return total;
};

const mapStateToProps = (state) => {
  return {
    calorieSums: state.calorieSums,
    fetchedPosts: state.fetchedPosts,
    auth: state.auth,
    date: state.date,
  };
};

export default connect(mapStateToProps, actions)(DaysTotal);
