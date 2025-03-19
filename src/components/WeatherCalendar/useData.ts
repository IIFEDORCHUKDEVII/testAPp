import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useWeatherService from '../../service/weather/service';
import {useAppSelector} from '../../store/root/hooks';
import {selectWeathers} from '../../store/weather/slice';
import {useNavigation} from '@react-navigation/native';
import type {DateData} from 'react-native-calendars';
import type {List, Weathers} from '../../service/weather/weather.types';
import {useDayWeather} from '../../hooks/useDayWeather';
import {ImageSourcePropType} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useGroupWeather} from '../../hooks/useGroupWeather';
/**
 * Custom hook to manage weather data and handle day press events.
 *
 * This hook uses the weather service to fetch weather data
 * and provides a function to navigate to the DayWeatherScreen when a day is pressed.
 *
 * @returns An object containing weather data and a function to handle day press.
 */
export const listIcon: Record<string, ImageSourcePropType> = {
  '01d': require('../../assets/icons/Clear.png'),
  '02d': require('../../assets/icons/Clear.png'),
  '02n': require('../../assets/icons/Clear.png'),
  '03d': require('../../assets/icons/Clouds.png'),
  '03n': require('../../assets/icons/Clouds.png'),
  '04d': require('../../assets/icons/Clouds.png'),
  '04n': require('../../assets/icons/Clouds.png'),
  '10n': require('../../assets/icons/Rain.png'),
};
export const useData = () => {
  const [selectedDay, setSelectedDay] = useState<DateData | null>(null);
  // Access navigation object for DayWeatherScreen
  const {dayWeather} = useDayWeather(selectedDay as DateData);
  const {groupWeather} = useGroupWeather();
  const sheetRef = useRef<BottomSheet>(null);
  console.log(groupWeather, 'groupWeather');

  // Variables
  const snapPoints = useMemo(() => ['1%', '25%', '90%'], []);

  // Fetch weather data using the weather service
  const {fetchAllWeather} = useWeatherService();

  // Select weather data from the store
  const weather = useAppSelector(selectWeathers) as unknown as Weathers;

  /**
   * Callback function to navigate to the DayWeatherScreen with the selected day.
   *
   * @param day - The selected day data.
   */
  const onPressDay = useCallback(
    (day: DateData) => {
      setSelectedDay(day);
      sheetRef.current?.snapToIndex(1);
    },
    [setSelectedDay],
  );

  useEffect(() => {
    fetchAllWeather();
  }, [fetchAllWeather]);

  return {
    weather: weather?.data || [],
    groupWeather,
    dayWeather,
    sheetRef,
    snapPoints,
    listIcon,
    onPressDay,
  };
};
