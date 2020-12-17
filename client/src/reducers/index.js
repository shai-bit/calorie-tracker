import { combineReducers } from 'redux';
import loginPopupReducer from './loginPopupReducer';
import authReducer from './authReducer';
import createUserReducer from './createUserReducer';
import localSignupReducer from './localSignupReducer';
import dateReducer from './dateReducer';
import createPostReducer from './createPostReducer';
import foodFormPopupReducer from './foodFormPopupReducer';
import fetchPostsReducer from './fetchPostsReducer';
import calorieSumReducer from './calorieSumReducer';
import updateGoalReducer from './updateGoalReducer';
import macroSumReducer from './macroSumReducer';

export default combineReducers({
  popup: loginPopupReducer,
  auth: authReducer,
  login: createUserReducer,
  signup: localSignupReducer,
  date: dateReducer,
  post: createPostReducer,
  foodForm: foodFormPopupReducer,
  fetchedPosts: fetchPostsReducer,
  calorieSums: calorieSumReducer,
  updatedGoal: updateGoalReducer,
  macrosSums: macroSumReducer,
});
