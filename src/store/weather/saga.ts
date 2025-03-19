import {type SagaIterator} from '@redux-saga/core';
import {call, put, takeEvery} from 'redux-saga/effects';

import {weatherActions} from './slice';
import {List} from '../../service/weather/weather.types';
import {WeatherServiceApi} from '../../service/weather/weather.api';
// Worker Sagas
/**
 * Worker saga to fetch the weather data.
 * @returns {SagaIterator} A saga iterator.
 */
export function* onGetWeather(): SagaIterator {
  try {
    /**
     * Call the weather API to get the weather data.
     */
    const posts: List[] = yield call(WeatherServiceApi.getWeather);
    /**
     * Dispatch the action to update the state with the received weather data.
     */
    yield put(weatherActions.fetchAllSucceeded(posts));
  } catch (e: unknown) {
    if (e instanceof Error) {
      /**
       * Dispatch the action to update the state with the received error message.
       */
      yield put(weatherActions.fetchAllFailure(e.message.toString()));
    }
  }
}

// Watcher Saga
function* weatherWatcherSaga(): SagaIterator {
  try {
    yield takeEvery(weatherActions.fetchAll, function* (action) {
      if (action) {
        yield call(onGetWeather);
      } else {
        console.error('Null or undefined action received for fetchAll');
      }
    });
  } catch (e) {
    console.error('Unhandled exception in weatherWatcherSaga:', e);
  }
}

export default weatherWatcherSaga;
