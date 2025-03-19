import {useEffect} from 'react';
import useWeatherService from '../service/weather/service';
import {useAppSelector} from '../store/root/hooks';
import {selectWeathers} from '../store/weather/slice';
import type {List} from '../service/weather/weather.types';

/**
 * Groups weather data by date.
 *
 * @param weatherData The weather data to group, or undefined if there is no data.
 * @returns An array of objects with `title` and `data` properties. The `title` property is the date in format YYYY-MM-DD,
 * and the `data` property is an array of weather data entries that belong to that date.
 */
function groupWeatherByDate(
  weatherData: List[] | undefined,
): {title: string; data: List[]}[] {
  if (!weatherData) {
    return [];
  }

  // Create an object with date as key and array of weather data entries as value
  const groupedData: Record<string, List[]> = weatherData.reduce(
    (acc, entry) => {
      const date = entry.dt_txt ? entry.dt_txt.slice(0, 10) : ''; // Extract YYYY-MM-DD

      // If the date is not already present in the object, add it
      if (!acc[date]) {
        acc[date] = [];
      }
      // Add the weather data entry to the array
      acc[date].push(entry);
      return acc;
    },
    {} as Record<string, List[]>,
  );

  // Convert the object to an array of objects with title and data properties
  return Object.entries(groupedData).map(([date, data]) => ({
    title: date,
    data,
  }));
}

export const useGroupWeather = () => {
  const weather = useAppSelector(selectWeathers) as unknown as {
    data: {list: List[]};
  };

  // Fetch the weather data using the useWeatherService hook
  const {fetchAllWeather} = useWeatherService();
  useEffect(() => {
    fetchAllWeather();
  }, [fetchAllWeather]);

  return {
    groupWeather:
      weather.data?.list.length > 0
        ? groupWeatherByDate(weather?.data.list)
        : [],
  };
};
