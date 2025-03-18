import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../../store/root/hooks';
import {selectWeathers, weatherActions} from '../../store/weather/slice';
import {List} from './weather.types';

interface WeatherServiceOperators {
  weathers: List[];
  fetchAllWeather: () => void;
}

const useWeatherService = (): Readonly<WeatherServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    weathers: useAppSelector(selectWeathers),

    fetchAllWeather: useCallback(() => {
      dispatch(weatherActions.fetchAllIsLoading());
      dispatch(weatherActions.fetchAll());
    }, [dispatch]),
  };
};

export default useWeatherService;
