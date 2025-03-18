import {RootState} from '../root/config.store';
// DUCKS pattern
import {createAction, createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {Weathers, List} from '../../service/weather/weather.types';
export interface WeatherState {
  data: Weathers['data']['list'];
  loading: boolean;
  error: string;
}

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: '',
};

// slice
export const weathersSlice = createSlice({
  name: 'weathers',
  initialState,
  reducers: {
    fetchAllIsLoading(state) {
      state.loading = true;
    },
    fetchAllSucceeded(state, action: PayloadAction<Weathers['data']['list']>) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.data = action.payload as Weathers['data']['list'];
      state.loading = false;
    },
    fetchAllFailure(state, action: PayloadAction<string>) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Actions
export const weatherActions = {
  fetchAll: createAction(`${weathersSlice.name}`),
  fetchAllIsLoading: weathersSlice.actions.fetchAllIsLoading,
  fetchAllSucceeded: weathersSlice.actions.fetchAllSucceeded,
  fetchAllFailure: weathersSlice.actions.fetchAllFailure,
};

// Selectors
export const selectWeathers = (state: RootState): List[] => state.weather.data;
export default weathersSlice.reducer;
