import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './FoodFormPopup.css';

const FoodFormPopup = (props) => {
  // Dynamic class to show food form
  const isVisible = props.foodForm.isVisible === true ? 'visible' : '';
  // Dynamic class to show 'incomplete' alert
  const [completeInput, setCompleteInput] = useState(true);
  const showAlert = completeInput === true ? 'hidden' : '';

  const renderContent = (formAction) => {
    if (formAction === 'add') {
      // Return add form
      return (
        <div
          className="food-form__container"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="popup__close" onClick={() => closePopup()}>
            &times;
          </span>
          <form className="food-form__form" onSubmit={handleSubmit}>
            <h1>Add item</h1>
            <label htmlFor="time">Time:</label>
            <select
              id="time"
              className="food-form__input select"
              value={props.foodForm.category}
              onChange={(e) => props.changeFoodCategory(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
            <br />
            <label htmlFor="product">Product name</label>
            <input
              id="product"
              type="text"
              className="food-form__input"
              value={props.foodForm.product}
              onChange={(e) => props.updateProductName(e.target.value)}
            />
            <label htmlFor="kcal">Kcal</label>
            <input
              id="kcal"
              type="number"
              className="food-form__input"
              value={props.foodForm.kcal}
              onChange={(e) => handleNumericChange(e, 'kcal')}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              className="food-form__input"
              value={props.foodForm.quantity}
              onChange={(e) => handleNumericChange(e, 'quantity')}
            />
            <div className={`food-form__alert ${showAlert}`}>
              Please complete all inputs
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      );
    } //Return update/delete form
    else {
      return (
        <div
          className="food-form__container"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="popup__close" onClick={() => closePopup()}>
            &times;
          </span>
          <form className="food-form__form" onSubmit={handleUpdate}>
            <h1>Update item</h1>
            <label htmlFor="time">Time:</label>
            <select
              id="time"
              className="food-form__input select"
              value={props.foodForm.category}
              onChange={(e) => props.changeFoodCategory(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
            <br />
            <label htmlFor="product">Product name</label>
            <input
              id="product"
              type="text"
              className="food-form__input"
              value={props.foodForm.product}
              onChange={(e) => props.updateProductName(e.target.value)}
            />
            <label htmlFor="kcal">Kcal</label>
            <input
              id="kcal"
              type="number"
              className="food-form__input"
              value={props.foodForm.kcal}
              onChange={(e) => handleNumericChange(e, 'kcal')}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              className="food-form__input"
              value={props.foodForm.quantity}
              onChange={(e) => handleNumericChange(e, 'quantity')}
            />
            <div className={`food-form__alert ${showAlert}`}>
              Please complete all inputs
            </div>
            <button className="update-delete" type="submit">
              Update
            </button>
            <button
              className="update-delete delete"
              type="submit"
              onClick={(e) => handleDeletion(e)}
            >
              Delete
            </button>
          </form>
        </div>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { category, product, quantity, kcal } = props.foodForm;
    const { date } = props;
    // If incomplete or invalid input show warning
    if (product === '' || quantity === 0 || kcal === 0) {
      return setCompleteInput(false);
    }
    // Create post, fetch them again to re-render, close
    await props.createPost({
      date: date,
      post: { category, product, kcal, quantity },
    });
    await props.fetchPosts({ date: props.date });
    closePopup();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { product, quantity, kcal } = props.foodForm;
    const { date, foodForm } = props;
    // If incomplete or invalid input show warning
    if (product === '' || quantity === 0 || kcal === 0) {
      return setCompleteInput(false);
    }
    // Update post, fetch them again for re-render, then close
    await props.updatePost({ date, updatedItem: foodForm });
    await props.fetchPosts({ date: props.date });
    closePopup();
  };

  const handleDeletion = async (e) => {
    e.preventDefault();
    const { itemId } = props.foodForm;
    // Delete post, fetch them again for re-render, then close
    await props.deletePost({ date: props.date, itemId });
    await props.fetchPosts({ date: props.date });
    closePopup();
  };

  const handleNumericChange = (e, type) => {
    const updateFunction =
      type === 'kcal' ? props.updateProductKcal : props.updateProductQuantity;
    if (isNaN(parseInt(e.target.value))) return updateFunction(0);
    updateFunction(parseInt(e.target.value));
  };
  // Hide popup, reset form, hide any alert
  const closePopup = () => {
    props.hideFoodForm();
    setCompleteInput(true);
  };

  return (
    <div className={`food-form ${isVisible}`} onClick={() => closePopup()}>
      {renderContent(props.foodForm.action)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, date: state.date, foodForm: state.foodForm };
};

export default connect(mapStateToProps, actions)(FoodFormPopup);
