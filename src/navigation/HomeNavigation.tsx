import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from './HomeNavigation.types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DayWeatherScreen from '../screens/DayWeatherScreen/DayWeatherScreen';

const {Screen, Navigator} = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
  return (
    <Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="DayWeatherScreen" component={DayWeatherScreen} />
    </Navigator>
  );
};

export default HomeNavigation;
