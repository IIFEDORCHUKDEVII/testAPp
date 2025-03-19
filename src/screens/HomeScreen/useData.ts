import {useEffect} from 'react';
import useWeatherService from '../../service/weather/service';
import {useAppSelector} from '../../store/root/hooks';
import {selectWeathers} from '../../store/weather/slice';

export const useData = () => {
  const weather = useAppSelector(selectWeathers);
 

  return {weather: weather};
};
