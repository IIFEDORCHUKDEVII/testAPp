import {useCallback, useEffect} from 'react';
import useWeatherService from '../../service/weather/service';
import {useAppSelector} from '../../store/root/hooks';
import {selectWeathers} from '../../store/weather/slice';
import {List} from '../../service/weather/weather.types';
import {useNavigation} from '@react-navigation/native';
import {
  DayWeatherScreenProps,
  HomeStackProps,
} from '../../navigation/HomeNavigation.types';
import {DateData} from 'react-native-calendars';
export const useData = () => {
  const navigation = useNavigation<DayWeatherScreenProps['navigation']>();
  const weather = useAppSelector(selectWeathers) as unknown as List[];
  console.log(weather);
  
  const onPressDay = useCallback(
    (day: DateData) => navigation.navigate('DayWeatherScreen', {day}),
    [],
  );
  const {fetchAllWeather} = useWeatherService();
  useEffect(() => {
    fetchAllWeather();
  }, []);

  return {weather, onPressDay};
};
