import {type Action, combineReducers, createReducer} from '@reduxjs/toolkit';
import {weathersSlice} from '../weather/slice';
import {dayWeathersSlice} from '../dayWeather/slice';
const appReducer = combineReducers({
  weather: weathersSlice.reducer,
  dayWeather: dayWeathersSlice.reducer,
});

const rootReducer = (state: any, action: Action) => {
  return appReducer(state, action);
};

export default rootReducer;
