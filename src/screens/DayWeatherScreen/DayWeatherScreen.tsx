import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useData} from './useData';

const DayWeatherScreen = () => {
  const {day} = useData();
  return (
    <View>
      <Text>{day.dateString}</Text>
    </View>
  );
};

export default DayWeatherScreen;

const styles = StyleSheet.create({});
