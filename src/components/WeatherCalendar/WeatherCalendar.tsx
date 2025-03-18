import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {useData} from './useData';
import {
  Calendar,
  CalendarList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import {Text} from '@react-navigation/elements';
/**
 * It utilizes the useData hook to fetch weather data and handle day press events.
 * The calendar is set to start on a specific date and displays the week view.
 */
const WeatherCalendar = () => {
  const {weather, onPressDay} = useData();
  console.log(weather, 'Object.values(weather)');

  return (
    <CalendarProvider date="2025-03-18">
      <WeekCalendar
        pastScrollRange={1}
        testID="2"
 focusable
        minDate="2025-03-18"
        maxDate="2025-03-23"
        initialDate="2025-03-18"
        onDayPress={day => {
          onPressDay(day);
        }}
      />
    </CalendarProvider>
  );
};

export default WeatherCalendar;

// const styles = StyleSheet.create({
//   day: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: Dimensions.get('window').width / 5,
//     height: 100,
//     margin: 5,
//     borderRadius: 8,
//     backgroundColor: '#555555',
//     shadowColor: '#333',
//     shadowOffset: {width: 0, height: 5},
//   },
// });
