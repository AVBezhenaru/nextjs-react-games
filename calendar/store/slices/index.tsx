import { combineReducers } from '@reduxjs/toolkit';

import changeEventDetailsReducer from './changeEventDetailsSlice';
import calendarReducer from './calendarSlice';
import calendarTableReducer from './calendarTableSlice';

export const calendarReducers = combineReducers({
  changeEventDetailsReducer,
  calendarReducer,
  calendarTableReducer,
});
