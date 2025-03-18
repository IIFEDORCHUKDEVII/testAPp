import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../../store/root/hooks';
import {List} from '../weather/weather.types';
import {
  dayWeatherActions,
  selectDyWeathers,
} from '../../store/dayWeather/slice';

interface DayWeatherServiceOperators {
  weathers: List[];
  fetchDayWeather: (day: string) => void;
}

const useDayWeatherService = (): Readonly<DayWeatherServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    weathers: useAppSelector(selectDyWeathers),

    fetchDayWeather: useCallback(
      (day: string) => {
        dispatch(dayWeatherActions.fetchDayisLoading());
        dispatch(dayWeatherActions.fetchDay({payload: day}));
      },
      [dispatch],
    ),
  };
};

export default useDayWeatherService;
