import {type SagaIterator} from '@redux-saga/core';
import {call, put, takeEvery} from 'redux-saga/effects';

import {weatherActions} from './slice';
import {List} from '../../service/weather/weather.types';
import {WeatherServiceApi} from '../../service/weather/weather.api';
// Worker Sagas
export function* onGetWeather(): SagaIterator {
  try {
    const posts: List[] = yield call(WeatherServiceApi.getWeather);
    yield put(weatherActions.fetchAllSucceeded(posts));
  } catch (e: unknown) {
    if (e instanceof Error) {
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
