import {type SagaIterator} from '@redux-saga/core';
import {call, put, takeEvery} from 'redux-saga/effects';
import {Weathers} from '../../service/weather/weather.types';
import {WeatherServiceApi} from '../../service/weather/weather.api';
import {dayWeatherActions} from './slice';

export function* onGetDayWeather({payload}: {payload: string}): SagaIterator {
  try {
    const posts: Weathers = yield call(() =>
      WeatherServiceApi.getWeatherByDate(payload),
    );
    yield put(dayWeatherActions.fetchDaySucceeded(posts));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(dayWeatherActions.fetchDayFailure(e.message.toString()));
    }
  }
}
// Watcher Saga
function* dayWeatherWatcherSaga(): SagaIterator {
  try {
    yield takeEvery(dayWeatherActions.fetchDay, function* (action) {
      if (action) {
        yield call(onGetDayWeather, action);
      } else {
        console.error('Null or undefined action received for fetchDay');
      }
    });
  } catch (e) {
    console.error('Unhandled exception in weatherWatcherSaga:', e);
  }
}
export default dayWeatherWatcherSaga;
