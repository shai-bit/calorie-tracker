import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const DaysTotal = (props) => {
  const { fetchedPosts, setCalorieSum } = props;
  useEffect(() => {
    if (fetchedPosts === '') {
      setCalorieSum({ breakfast: 0, lunch: 0, dinner: 0, snacks: 0 });
    }
  }, [fetchedPosts, setCalorieSum]);
  return (
    <div className="day-total">{`Total: ${getTotal(
      props.calorieSums
    )} kcal.`}</div>
  );
};

const getTotal = (calorieSums) => {
  const { breakfast, lunch, dinner, snacks } = calorieSums;
  let total = breakfast + lunch + dinner + snacks;
  return total;
};

const mapStateToProps = (state) => {
  return { calorieSums: state.calorieSums, fetchedPosts: state.fetchedPosts };
};

export default connect(mapStateToProps, actions)(DaysTotal);
