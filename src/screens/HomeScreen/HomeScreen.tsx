import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../wrappers/ScreenWrapper';
import {useData} from './useData';
import WeatherCalendar from '../../components/WeatherCalendar/WeatherCalendar';

const HomeScreen = () => {
  const {weather} = useData();
  return (
    <ScreenWrapper
      offTop="additive"
      children={
        <View style={{flex: 1}}>
          <WeatherCalendar />
        </View>
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
