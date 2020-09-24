import axios from 'axios';
import * as actions from './types';
import history from '../history';

// Show login slide in popup
export const loginPopup = () => {
  return {
    type: actions.LOGIN_SHOW,
  };
};

// Show signup slide in popup
export const signupPopup = () => {
  return {
    type: actions.SIGN_UP_SHOW,
  };
};

export const hidePopup = () => {
  return {
    type: actions.HIDE_POPUP,
  };
};

// Check if user is logged in
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: actions.FETCH_USER, payload: res.data });
};

// Local user creation, returns status
export const createUser = (signUpForm) => async (dispatch) => {
  const res = await axios.post('/api/create_user', signUpForm);
  // User created and logged in, tell redux store, return to dashboard
  if (res.data === 'user-created-loginsuccess') {
    await dispatch(fetchUser());
    history.push('/dashboard');
  }
  // Possible payloads: 'user-exists', 'user-created-loginsuccess'
  dispatch({ type: actions.LOCAL_SIGNUP, payload: res.data });
};

// Local user authentication, returns status
export const localLogin = (loginForm) => async (dispatch) => {
  const res = await axios.post('/api/login', loginForm);
  // If logged in tell our redux store we´re logged in and go to dashboard
  if (res.data === 'login-success') {
    await dispatch(fetchUser());
    history.push('/dashboard');
  }
  // Possible payloads: 'not-found', 'invalid-pass', 'login-success'
  dispatch({ type: actions.LOCAL_LOGIN, payload: res.data });
};

export const setDate = (date) => {
  return {
    type: actions.SET_DATE,
    payload: date,
  };
};

export const showFoodFormAdd = (form) => {
  return {
    type: actions.SHOW_FOODFORM_POPUP_ADD,
    payload: { category: form.category, action: form.action },
  };
};

export const showFoodFormUpdate = (form) => {
  return {
    type: actions.SHOW_FOODFORM_POPUP_UPDATE,
    payload: { category: form.category, action: form.action, item: form.item },
  };
};

export const hideFoodForm = () => {
  return { type: actions.HIDE_FOODFORM_POPUP };
};

export const createPost = (post) => async (dispatch) => {
  const res = await axios.post('/api/create_post', post);
  dispatch({ type: actions.CREATE_POST, payload: res.data });
};

export const updatePost = (updatedPost) => async (dispatch) => {
  const res = await axios.post('/api/update_post', updatedPost);
  dispatch({ type: actions.UPDATE_POST, payload: res.data });
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await axios.post('api/delete_post', postId);
  dispatch({ type: actions.DELETE_POST, payload: res.data });
};

export const fetchPosts = (date) => async (dispatch) => {
  const res = await axios.post('/api/fetch_posts', date);
  dispatch({ type: actions.FETCH_POSTS, payload: res.data });
};

export const changeFoodCategory = (category) => {
  return { type: actions.CHANGE_FOOD_CATEGORY, payload: category };
};

export const updateProductName = (name) => {
  return { type: actions.UPDATE_PRODUCT_NAME, payload: name };
};

export const updateProductKcal = (kcal) => {
  return { type: actions.UPDATE_PRODUCT_KCAL, payload: kcal };
};

export const updateProductQuantity = (quantity) => {
  return { type: actions.UPDATE_PRODUCT_QUANTITY, payload: quantity };
};

export const setCalorieSum = (sum) => {
  return { type: actions.CALORIE_SUM, payload: sum };
};

export const updateGoal = (goal) => async (dispatch) => {
  const res = await axios.post('/api/update_goal', goal);
  dispatch({ type: actions.UPDATE_GOAL, payload: res.data });
};
