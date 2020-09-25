import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const DaysTotal = (props) => {
  const [todaysDate, setDate] = useState(null);
  const { fetchedPosts, setCalorieSum } = props;
  const [goalValue, setGoalValue] = useState(0);

  // Dynamic class for showing goal change form
  const [formVisible, setFormVisible] = useState(false);
  const formVisibility = formVisible === false ? "hidden" : "";

  // Makes sure to reset calorie count if no posts yet
  useEffect(() => {
    if (fetchedPosts === "") {
      setCalorieSum({ breakfast: 0, lunch: 0, dinner: 0, snacks: 0 });
    }
  }, [fetchedPosts, setCalorieSum]);

  // Set date if user changes day
  const { date } = props;
  useEffect(() => {
    setDate(getStringDate());
  }, [setDate, date]);

  return (
    <React.Fragment>
      {renderContent(
        todaysDate,
        props,
        getTotal,
        goalValue,
        setGoalValue,
        formVisible,
        setFormVisible,
        formVisibility
      )}
    </React.Fragment>
  );
};

// If selected day equals current day render goal, else just total kcal
const renderContent = (
  todaysDate,
  props,
  getTotal,
  goalValue,
  setGoalValue,
  formVisible,
  setFormVisible,
  formVisibility
) => {
  if (props.auth === null) return;
  const { goal } = props.auth;
  const { date, calorieSums } = props;
  const total = getTotal(calorieSums);
  if (todaysDate === date) {
    let caloriesLeft = 0;
    // Show a zero for sum instead of negative number
    if (goal > 0) {
      caloriesLeft += goal - total;
    }
    return (
      <div className='day-total__container'>
        <div className='day-total'>
          <span
            className='day-total__goal'
            onClick={() => setFormVisible(!formVisible)}
          >
            Goal: {goal}
          </span>{" "}
          - Total: {total} ={" "}
          <span className='day-total__remaining'>{caloriesLeft}</span> Remaining
        </div>
        <div className={`goal-form ${formVisibility}`}>
          <label htmlFor='goal'>Change goal</label>
          <input
            id='goal'
            type='number'
            className='goal-form__input'
            value={goalValue}
            onChange={(e) => setGoalValue(e.target.value)}
          />
        </div>
      </div>
    );
  }
  return (
    <div className='day-total__container'>
      <div className='day-total'>Total: {total} kcal</div>
    </div>
  );
};

// Returns date as string
const getStringDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  var fullDate = "" + year + month + day;
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
