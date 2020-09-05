import { combineReducers } from 'redux';
import popupReducer from './popupReducer';
import authReducer from './authReducer';

export default combineReducers({ popup: popupReducer, auth: authReducer });
