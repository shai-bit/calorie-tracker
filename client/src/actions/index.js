import axios from 'axios';
import * as actions from './types';

export const loginPopup = () => {
  return {
    type: actions.LOGIN_SHOW,
  };
};

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

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: actions.FETCH_USER, payload: res.data });
};

export const createUser = (signUpForm) => async (dispatch) => {
  const res = await axios.post('/api/create_user', signUpForm);
  dispatch({ type: actions.LOCAL_SIGNUP, payload: res.data });
};

export const localLogin = (loginForm) => async (dispatch) => {
  const res = await axios.post('/api/login', loginForm);
  dispatch({ type: actions.LOCAL_LOGIN, payload: res.data });
};
