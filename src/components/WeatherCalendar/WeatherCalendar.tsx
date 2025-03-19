import {useCallback} from 'react';
import {useData} from './useData';
import {CalendarProvider, WeekCalendar} from 'react-native-calendars';
import {Image, StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import WeatherList from '../WeatherList/WeatherList';

/**
 * WeatherCalendar component
 *
 * This component displays a week view calendar that utilizes the `useData` hook
 * to fetch weather data and handle day press events. The calendar is set to start
 * on a specific date and provides a limited date range for selection.
 */
const WeatherCalendar = () => {
  // Destructure weather data and onPressDay function from useData hook
  const {
    weather,
    groupWeather,
    dayWeather,
    listIcon,
    sheetRef,
    snapPoints,
    onPressDay,
  } = useData();
  console.log(weather);

  /**
   * Renders individual weather item for the selected day.
   *
   * @param {Object} item - The weather data item.
   * @returns {JSX.Element} - The rendered weather item component.
   */
  const renderWeatherItem = useCallback(
    ({item}: {item: any}) => (
      <View style={styles.weather}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/icons/clock.png')}
            style={styles.img}
          />
          <Text>
            {` ${new Date(item.dt_txt)
              .getUTCHours()
              .toString()
              .padStart(2, '0')}:00`}
          </Text>
        </View>
        <View style={{rowGap: 2}}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/icons/temp.png')}
              style={styles.img}
            />
            <Text>{item.main.temp.toFixed(1)}°C</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={require('../../assets/icons/wind.png')}
              style={styles.img}
            />
            <Text>{item.wind.speed.toFixed(1)} km/h</Text>
          </View>
          <View style={styles.row}>
            <Image source={listIcon[item.weather[0].icon]} style={styles.img} />
            <Text>{item.weather[0].description}</Text>
          </View>
        </View>
      </View>
    ),
    [listIcon],
  );

  /**
   * Renders the calendar view.
   *
   * @returns {JSX.Element|null} - The rendered calendar component or null if no weather data.
   */
  return (
    weather?.list && (
      <View style={{flex: 1}}>
        <CalendarProvider date={weather.list[0].dt_txt.slice(0, 10)}>
          <View style={{flex: 1, overflow: 'visible'}}>
            <WeekCalendar
              pastScrollRange={1}
              testID="2"
              focusable
              firstDay={1}
              minDate={weather.list[0].dt_txt.slice(0, 10)}
              maxDate={(weather.list as any[]).at(-1).dt_txt.slice(0, 10)}
              initialDate={weather.list[0].dt_txt.slice(0, 10)}
              onDayPress={day => {
                onPressDay(day);
              }}
            />
            <WeatherList groupWeather={groupWeather} />
          </View>
          <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints}>
            <BottomSheetView style={styles.contentContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                horizontal
                data={dayWeather || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWeatherItem}
              />
            </BottomSheetView>
          </BottomSheet>
        </CalendarProvider>
      </View>
    )
  );
};

export default WeatherCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 36,
    backgroundColor: '#99999069',
    alignItems: 'center',
  },
  img: {width: 22, height: 22},
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 2,
    alignItems: 'center',
  },
  weather: {
    paddingTop: 12,
    borderRadius: 8,
    padding: 8,
    maxHeight: 140,
    justifyContent: 'space-between',
    width: 120,
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: 'column',
    backgroundColor: '#47524085',
  },
});
