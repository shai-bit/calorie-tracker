import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './FoodFormPopup.css';

const FoodFormPopup = (props) => {
  const [itemForm, setItemForm] = useState({
    category: props.foodForm.category,
    product: '',
    quantity: 0,
    kcal: 0,
  });
  const [completeInput, setCompleteInput] = useState(true);
  // Dynamic class to show food form
  const isVisible = props.foodForm.isVisible === true ? 'visible' : '';
  // Dynamic class to show 'incomplete' alert
  const showAlert = completeInput === true ? 'hidden' : '';

  // Create post then fetch posts again
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If incomplete or invalid input show warning
    const { product, quantity, kcal } = itemForm;
    if (
      product === '' ||
      quantity === 0 ||
      isNaN(quantity) ||
      kcal === 0 ||
      isNaN(kcal)
    ) {
      return setCompleteInput(false);
    }
    const { auth, date } = props;
    await props.createPost({
      id: auth._id,
      date: date,
      post: itemForm,
    });
    props.fetchPosts({ date: props.date });
  };

  // Hide popup, hide alert, reset form
  const onClose = () => {
    props.hideFoodForm();
    setCompleteInput(true);
    setItemForm({ ...itemForm, product: '', quantity: 0, kcal: 0 });
  };

  return (
    <div className={`food-form ${isVisible}`} onClick={() => onClose()}>
      <div
        className="food-form__container"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="popup__close" onClick={() => onClose()}>
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
            value={itemForm.product}
            onChange={(e) =>
              setItemForm({ ...itemForm, product: e.target.value })
            }
          />
          <label htmlFor="kcal">Kcal</label>
          <input
            id="kcal"
            type="number"
            className="food-form__input"
            value={itemForm.kcal}
            onChange={(e) =>
              setItemForm({ ...itemForm, kcal: parseInt(e.target.value) })
            }
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            className="food-form__input"
            value={itemForm.quantity}
            onChange={(e) =>
              setItemForm({ ...itemForm, quantity: parseInt(e.target.value) })
            }
          />
          <div className={`food-form__alert ${showAlert}`}>
            Please complete all inputs
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, date: state.date, foodForm: state.foodForm };
};

export default connect(mapStateToProps, actions)(FoodFormPopup);
