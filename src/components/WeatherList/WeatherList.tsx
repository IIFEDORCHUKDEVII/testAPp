import {
  Dimensions,
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {List} from '../../service/weather/weather.types';
import {FC} from 'react';
import {listIcon} from '../WeatherCalendar/useData';
interface WeatherListProps {
  groupWeather: {title: string; data: List[]}[];
}
/**
 * WeatherList component
 *
 * This component displays a list of weather data grouped by date.
 * It uses a SectionList to render the weather information for each section.
 *
 * @param {Object} props - The component props
 * @param {Array} props.groupWeather - Array of weather data grouped by date
 * @returns {JSX.Element} The rendered component
 */
const WeatherList: FC<WeatherListProps> = ({groupWeather}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <SectionList
        sections={groupWeather}
        style={{flexGrow: 1}}
        ListFooterComponent={() => <View />}
        ListFooterComponentStyle={{height: 120}}
        // Render the header for each section
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.header}>
            <Text style={{fontFamily: 'Roboto_Condensed-Black'}}>{title}</Text>
          </View>
        )}
        // Render the footer for each section
        renderSectionFooter={() => <View style={styles.footer} />}
        // Render each weather item
        renderItem={({item, index}) =>
          !item.dt_txt?.includes(
            groupWeather[index]?.data.at(-1)?.dt_txt ?? '',
          ) ? (
            <View
              style={[
                styles.item,
                item.dt_txt?.includes(
                  groupWeather[index]?.data.at(-3)?.dt_txt ?? '',
                ) && {
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                },
              ]}
            >
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
                <Image
                  source={listIcon[item.weather[0].icon]}
                  style={styles.img}
                />
                <Text>{item.weather[0].description}</Text>
              </View>
            </View>
          ) : (
            <View />
          )
        }
      />
    </View>
  );
};

export default WeatherList;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    padding: 8,
    marginTop: 12,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: '#99999069',
    width: '98%',
  },
  footer: {
    height: 20,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: '#99999069',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 5,
    backgroundColor: '#999999',
    alignSelf: 'center',
    width: '98%',
    padding: 2,
  },
  img: {width: 22, height: 22},
  row: {
    padding: 6,
    marginVertical: 4,
    width: Dimensions.get('window').width / 4 - 16,
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
