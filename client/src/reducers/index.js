import { combineReducers } from 'redux';
import popupReducer from './popupReducer';
import authReducer from './authReducer';
import createUserReducer from './createUserReducer';
import localSignupReducer from './localSignupReducer';
import dateReducer from './dateReducer';

export default combineReducers({
  popup: popupReducer,
  auth: authReducer,
  login: createUserReducer,
  signup: localSignupReducer,
  date: dateReducer,
});
