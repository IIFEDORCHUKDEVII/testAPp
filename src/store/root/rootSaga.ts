import {all, fork} from 'redux-saga/effects';
import weatherWatcherSaga from '../weather/saga';
import dayWeatherWatcherSaga from '../dayWeather/saga';

export function* rootSaga(): any {
  yield all([fork(weatherWatcherSaga)]);
  yield all([fork(dayWeatherWatcherSaga)]);
}

export default rootSaga;
