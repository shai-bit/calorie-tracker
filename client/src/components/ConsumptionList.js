import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ConsumptionList = (props) => {
  // Fetch posts on initial load an if auth or date changes
  const { auth, date, fetchPosts, fetchedPosts, setCalorieSum } = props;
  useEffect(() => {
    if (auth === null) {
      return;
    }
    fetchPosts({ date });
  }, [auth, date, fetchPosts]);
  // Get calories sum if fetched posts changes
  useEffect(() => {
    renderTotalKcal(fetchedPosts, setCalorieSum);
  }, [fetchedPosts, setCalorieSum]);
  return (
    <div className="consumption">
      <div className="consumption__card bkfast">
        <div className="consumption__card--header">
          Breakfast
          <span
            onClick={() =>
              props.showFoodFormAdd({ category: 'breakfast', action: 'add' })
            }
          >
            +
          </span>
        </div>
        <div className="consumption__card--body">
          <table className="consumption__card--table">
            <tbody>
              <tr>
                <th className="table__header product">Product</th>
                <th className="table__header">Kcal</th>
                <th className="table__header quantity">Qty</th>
              </tr>
              {renderFoodPosts(props.fetchedPosts, 'breakfast', props)}
            </tbody>
            <tfoot>
              <tr>
                <th className="table__footer total">Total:</th>
                <th className="table__footer quantity">
                  {props.calorieSums.breakfast}
                </th>
                <th className="table__footer"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="consumption__card lunch">
        <div className="consumption__card--header">
          Lunch
          <span
            onClick={() =>
              props.showFoodFormAdd({ category: 'lunch', action: 'add' })
            }
          >
            +
          </span>
        </div>
        <div className="consumption__card--body">
          <table className="consumption__card--table">
            <tbody>
              <tr>
                <th className="table__header product">Product</th>
                <th className="table__header">Kcal</th>
                <th className="table__header quantity">Qty</th>
              </tr>
              {renderFoodPosts(props.fetchedPosts, 'lunch', props)}
            </tbody>
            <tfoot>
              <tr>
                <th className="table__footer total">Total:</th>
                <th className="table__footer quantity">
                  {props.calorieSums.lunch}
                </th>
                <th className="table__footer"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="consumption__card dinner">
        <div className="consumption__card--header">
          Dinner
          <span
            onClick={() =>
              props.showFoodFormAdd({ category: 'dinner', action: 'add' })
            }
          >
            +
          </span>
        </div>
        <div className="consumption__card--body">
          <table className="consumption__card--table">
            <tbody>
              <tr>
                <th className="table__header product">Product</th>
                <th className="table__header">Kcal</th>
                <th className="table__header quantity">Qty</th>
              </tr>
              {renderFoodPosts(props.fetchedPosts, 'dinner', props)}
            </tbody>
            <tfoot>
              <tr>
                <th className="table__footer total">Total:</th>
                <th className="table__footer quantity">
                  {props.calorieSums.dinner}
                </th>
                <th className="table__footer"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="consumption__card snacks">
        <div className="consumption__card--header">
          Snacks
          <span
            onClick={() =>
              props.showFoodFormAdd({ category: 'snacks', action: 'add' })
            }
          >
            +
          </span>
        </div>
        <div className="consumption__card--body">
          <table className="consumption__card--table">
            <tbody>
              <tr>
                <th className="table__header product">Product</th>
                <th className="table__header">Kcal</th>
                <th className="table__header quantity">Qty</th>
              </tr>
              {renderFoodPosts(props.fetchedPosts, 'snacks', props)}
            </tbody>
            <tfoot>
              <tr>
                <th className="table__footer total">Total:</th>
                <th className="table__footer quantity">
                  {props.calorieSums.snacks}
                </th>
                <th className="table__footer"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

// Sums all items' kcal for every category
const getSums = (object, foodItem) => {
  const { kcal, quantity } = foodItem;
  if (foodItem.category === 'breakfast') {
    object.breakfast += kcal * quantity;
  } else if (foodItem.category === 'lunch') {
    object.lunch += kcal * quantity;
  } else if (foodItem.category === 'dinner') {
    object.dinner += kcal * quantity;
  } else {
    object.snacks += kcal * quantity;
  }
};

// Makes sums and updates calorieSums property inside Redux store
const renderTotalKcal = (fetchedPosts, setCalorieSum) => {
  if (fetchedPosts === null || fetchedPosts === '') return 'sorry';
  const object = { breakfast: 0, lunch: 0, dinner: 0, snacks: 0 };
  fetchedPosts.dates[0].posts.forEach((foodItem) => {
    getSums(object, foodItem);
  });
  setCalorieSum(object);
};

// Renders posts for that time of the day
const renderFoodPosts = (fetchedPosts, category, props) => {
  if (fetchedPosts === '' || fetchedPosts === null) return null; // No posts in that day yet
  const posts = fetchedPosts.dates[0].posts.map((foodItem, index) => {
    if (foodItem.category === category) {
      return (
        <tr
          className="consumption__card--row"
          key={index}
          onClick={() => updateDeleteRow(foodItem, props)}
        >
          <td className="table__cell--name">{foodItem.product}</td>
          <td>{foodItem.kcal}</td>
          <td className="table__cell--quantity">{foodItem.quantity}</td>
        </tr>
      );
    }
    return null;
  });
  return posts;
};

const updateDeleteRow = (foodItem, props) => {
  props.showFoodFormUpdate({
    category: foodItem.category,
    action: 'update',
    item: foodItem,
  });
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
    foodForm: state.foodForm,
    date: state.date,
    fetchedPosts: state.fetchedPosts,
    calorieSums: state.calorieSums,
  };
};

export default connect(mapStateToProps, actions)(ConsumptionList);
