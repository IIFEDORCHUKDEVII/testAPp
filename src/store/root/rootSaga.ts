import {all, fork} from 'redux-saga/effects';
import weatherWatcherSaga from '../weather/saga';

export function* rootSaga(): any {
  yield all([fork(weatherWatcherSaga)]);
}

export default rootSaga;
