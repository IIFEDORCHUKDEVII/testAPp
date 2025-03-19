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

    /**
     * Fetches all weather data from the API.
     * - Dispatches the action to update the state with the loading state.
     * - Dispatches the action to fetch the weather data.
     */
    fetchAllWeather: useCallback(() => {
      dispatch(weatherActions.fetchAllIsLoading());
      dispatch(weatherActions.fetchAll());
    }, [dispatch]),
  };
};

export default useWeatherService;

