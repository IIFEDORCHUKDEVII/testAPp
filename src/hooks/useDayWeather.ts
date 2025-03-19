import {useEffect, useMemo} from 'react';
import useWeatherService from '../service/weather/service';
import {useAppSelector} from '../store/root/hooks';
import {selectWeathers} from '../store/weather/slice';

import type {List} from '../service/weather/weather.types';
import type {DateData} from 'react-native-calendars';
/**
 * Hook to fetch weather data for a specific day and filter it by date.
 * The weather data is fetched using the useWeatherService hook.
 * The data is then filtered by the selected day using the useMemo hook.
 *
 * @param day - The selected day data.
 * @returns An object with the dayWeather property which is an array of weather data for the selected day.
 */
export const useDayWeather = (day: DateData) => {
  // Select weather data from the store
  const weather = useAppSelector(selectWeathers) as unknown as {
    data: {list: List[]};
  };

  // Fetch the weather data using the useWeatherService hook
  const {fetchAllWeather} = useWeatherService();

  // Memoize the filtered weather data for the selected day
  const dayWeather = useMemo(
    () =>
      day &&
      weather.data?.list.length > 0 &&
      weather.data.list.filter((item: any) =>
        item.dt_txt.startsWith(day.dateString),
      ),
    [day, weather],
  );

  // Fetch all weather data when the component mounts
  useEffect(() => {
    fetchAllWeather();
  }, [fetchAllWeather]);

  return {dayWeather};
};
