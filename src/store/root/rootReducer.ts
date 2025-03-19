import {type Action, combineReducers, createReducer} from '@reduxjs/toolkit';
import {weathersSlice} from '../weather/slice';
const appReducer = combineReducers({
  weather: weathersSlice.reducer,
});

const rootReducer = (state: any, action: Action) => {
  return appReducer(state, action);
};

export default rootReducer;
