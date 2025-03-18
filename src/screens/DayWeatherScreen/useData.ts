import {useRoute} from '@react-navigation/native';
import {DayWeatherScreenProps} from '../../navigation/HomeNavigation.types';
import {useEffect, useMemo} from 'react';
import {onGetDayWeather} from '../../store/dayWeather/saga';
import {useAppSelector} from '../../store/root/hooks';
import {selectDyWeathers} from '../../store/dayWeather/slice';
import useDayWeatherService from '../../service/dayWeather/service';
import {selectWeathers} from '../../store/weather/slice';
import useWeatherService from '../../service/weather/service';
import { List } from '../../service/weather/weather.types';
export const useData = () => {
  const day = useRoute<DayWeatherScreenProps['route']>().params;
  const weather = useAppSelector(selectWeathers) as unknown as List[]
  const {fetchAllWeather} = useWeatherService();
  useEffect(() => {
    fetchAllWeather();
  }, []);
  console.log(weather.data.list);

  const dayWeather = useMemo(
    () =>
      weather.data.list.length > 0 &&
      weather.data.list.filter(item =>
        item.dt_txt.startsWith(day.day.dateString),
      ),
    [weather],
  );
  console.log(dayWeather);

  return {day: day.day};
};
