import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DateData} from 'react-native-calendars';
type HomeStackParamList = {
  HomeScreen: undefined;
  DayWeatherScreen: {day: DateData};
};
type HomeStackProps = NativeStackScreenProps<HomeStackParamList>;
type DayWeatherScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'DayWeatherScreen'
>;
export type {HomeStackProps, HomeStackParamList, DayWeatherScreenProps};
