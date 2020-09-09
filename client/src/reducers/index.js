import { combineReducers } from 'redux';
import popupReducer from './popupReducer';
import authReducer from './authReducer';
import localLoginReducer from './localLoginReducer';
import localSignupReducer from './localSignupReducer';

export default combineReducers({
  popup: popupReducer,
  auth: authReducer,
  login: localLoginReducer,
  signup: localSignupReducer,
});
