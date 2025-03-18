import axios from 'axios';
import {Weathers} from './weather.types';
const api = axios.create({
  baseURL:
    'https://api.openweathermap.org/data/2.5/forecast?appid=d966c1d860c86785df1d17dc4ca4efb0&lon=-122.4194&lat=37.7749',
});
const API_KEY = 'd966c1d860c86785df1d17dc4ca4efb0';

 
export class WeatherServiceApi {
  static getWeather = async (): Promise<Weathers[]> =>
    api.get(
      'https://api.openweathermap.org/data/2.5/forecast?appid=d966c1d860c86785df1d17dc4ca4efb0&lon=-122.4194&lat=37.77490&lang=ua&units=metric&cnt=96',
    );
  static getWeatherByDate = async (date: string): Promise<Weathers[]> =>
    api.get(
      `https://api.openweathermap.org/data/3.0/onecall/day_summary?lon=-122.4194&lat=37.77490&date=1979-01-02&appid=d966c1d860c86785df1d17dc4ca4efb0`,
    );
}
