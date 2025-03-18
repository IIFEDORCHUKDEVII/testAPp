import {useEffect} from 'react';
import useWeatherService from '../../service/weather/service';
import {useAppSelector} from '../../store/root/hooks';
import {selectWeathers} from '../../store/weather/slice';

export const useData = () => {
  const weather = useAppSelector(selectWeathers);
  const {fetchAllWeather} = useWeatherService();
  console.log(weather );

  useEffect(() => {
    fetchAllWeather();
  }, []);

  return {weather: weather};
};
