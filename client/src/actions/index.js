import axios from 'axios';
import * as actions from './types';

export const loginPopup = () => {
  return {
    type: actions.LOGIN,
  };
};

export const signupPopup = () => {
  return {
    type: actions.SIGN_UP,
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
