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

export const createPost = (post) => async (dispatch) => {
  const res = await axios.post('/api/create_post', post);
  dispatch({ type: actions.CREATE_POST, payload: res.data });
};

export const showFoodForm = (category) => {
  return { type: actions.SHOW_FOODFORM_POPUP, payload: category };
};

export const hideFoodForm = () => {
  return { type: actions.HIDE_FOODFORM_POPUP };
};

export const changeFoodCategory = (category) => {
  return { type: actions.CHANGE_FOOD_CATEGORY, payload: category };
};

export const fetchPosts = (user) => async (dispatch) => {
  const res = await axios.post('/api/fetch_posts', user);
  dispatch({ type: actions.FETCH_POSTS, payload: res.data });
};
