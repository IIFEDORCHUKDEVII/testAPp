import {RootState} from '../root/config.store';
// DUCKS pattern
import {createAction, createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {Weathers, List} from '../../service/weather/weather.types';
export interface DayWeather {
  data: List[];
  loading: boolean;
  error: string;
}

const initialState: DayWeather = {
  data: [],
  loading: false,
  error: '',
};

// slice
export const dayWeathersSlice = createSlice({
  name: 'dayWeather',
  initialState,
  reducers: {
    fetchDayIsLoading(state) {
      state.loading = true;
    },
    fetchDaySucceeded(state, action: PayloadAction<Weathers>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDayFailure(state, action: PayloadAction<string>) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Actions
export const dayWeatherActions = {
  fetchDay: createAction(`${dayWeathersSlice.name}`, date => ({payload: date})),
  fetchDayisLoading: dayWeathersSlice.actions.fetchDayIsLoading,
  fetchDaySucceeded: dayWeathersSlice.actions.fetchDaySucceeded,
  fetchDayFailure: dayWeathersSlice.actions.fetchDayFailure,
};

// Selectors
export const selectDyWeathers = (state: RootState): List[] =>
  state.dayWeather.data;

export default dayWeathersSlice.reducer;
