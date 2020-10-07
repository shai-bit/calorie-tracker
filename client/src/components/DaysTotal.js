import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const DaysTotal = (props) => {
  const [todaysDate, setDate] = useState(null);
  const { fetchedPosts, setCalorieSum } = props;
  const [goalValue, setGoalValue] = useState(0);

  // Dynamic class for showing goal change form
  const [formVisible, setFormVisible] = useState(false);
  const formVisibility = formVisible === false ? 'hidden' : '';

  // Makes sure to reset calorie count if no posts yet
  useEffect(() => {
    if (fetchedPosts === '') {
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
        formVisibility,
        handleEnterDown
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
  formVisibility,
  handleEnterDown
) => {
  if (props.auth === null) return; // Auth is async
  const { goal } = props.auth;
  const { setUpdatedGoal, fetchUser } = props;
  const { date, calorieSums } = props;
  const total = getTotal(calorieSums);
  if (todaysDate === date) {
    // Dynamic class for remaining calories
    const remainingColor = total > goal ? 'red' : '';
    let caloriesLeft = 0;
    // Show a zero for sum instead of negative number
    if (goal > 0) {
      caloriesLeft += goal - total;
    }
    return (
      <div
        className="day-total__container"
        onKeyDown={(e) => {
          const enter = handleEnterDown(e.key);
          if (enter) {
            setFormVisible(!formVisible);
            setGoalInAPI(goal, goalValue, setUpdatedGoal, fetchUser);
          }
        }}
      >
        <div className="day-total">
          <span
            className="day-total__goal"
            onClick={() => {
              setGoalValue(goal);
              setFormVisible(!formVisible);
            }}
          >
            Goal: {goal}
          </span>{' '}
          - Total: {total} ={' '}
          <span className={`day-total__remaining ${remainingColor}`}>
            {caloriesLeft} Remaining
          </span>
        </div>
        <div
          className={`goal-form__back ${formVisibility}`}
          onClick={() => {
            setFormVisible(!formVisible);
            setGoalInAPI(goal, goalValue, setUpdatedGoal, fetchUser);
          }}
        >
          <div
            className={`goal-form ${formVisibility}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="goal-form__close"
              onClick={() => {
                setFormVisible(!formVisible);
                setGoalInAPI(goal, goalValue, setUpdatedGoal, fetchUser);
              }}
            >
              &times;
            </span>
            <label htmlFor="goal">Change goal</label>
            <input
              id="goal"
              type="number"
              className="goal-form__input"
              value={goalValue}
              onChange={(e) => {
                // If value is left blank avoid errors
                if (isNaN(parseInt(e.target.value))) return setGoalValue('');
                setGoalValue(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="day-total__container">
      <div className="day-total">Total: {total} kcal</div>
    </div>
  );
};

const handleEnterDown = (key) => {
  console.log(key);
  if (key === 'Enter') return true;
  return false;
};

const setGoalInAPI = async (
  currentGoal,
  goalValue,
  setUpdatedGoal,
  fetchUser
) => {
  // If goal doesn't change dont update
  if (currentGoal === goalValue) return;
  // If input left empty update to 0
  if (goalValue === '') {
    await setUpdatedGoal({ goal: 0 });
    return fetchUser();
  }
  await setUpdatedGoal({ goal: goalValue });
  return fetchUser();
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
    updatedGoal: state.updatedGoal,
  };
};

export default connect(mapStateToProps, actions)(DaysTotal);
