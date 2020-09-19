import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ConsumptionList = (props) => {
  // Fetch posts on initial load an when auth changes
  useEffect(() => {
    if (props.auth === null) {
      return;
    }
    props.fetchPosts({ date: props.date });
  }, [props.auth]);
  return (
    <div className="consumption">
      <div className="consumption__card bkfast">
        <div className="consumption__card--header">
          Breakfast
          <span onClick={() => props.showFoodForm('breakfast')}>+</span>
        </div>
        <div className="consumption__card--body">
          <ul className="consumption__card--list">
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="consumption__card lunch">
        <div className="consumption__card--header">
          Lunch<span onClick={() => props.showFoodForm('lunch')}>+</span>
        </div>
        <div className="consumption__card--body"></div>
      </div>
      <div className="consumption__card dinner">
        <div className="consumption__card--header">
          Dinner<span onClick={() => props.showFoodForm('dinner')}>+</span>
        </div>
        <div className="consumption__card--body"></div>
      </div>
      <div className="consumption__card snacks">
        <div className="consumption__card--header">
          Snacks<span onClick={() => props.showFoodForm('snacks')}>+</span>
        </div>
        <div className="consumption__card--body"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
    foodForm: state.foodForm,
    date: state.date,
    fetchedPosts: state.fetchedPosts,
  };
};

export default connect(mapStateToProps, actions)(ConsumptionList);
