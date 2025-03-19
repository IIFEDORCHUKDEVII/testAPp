import axios from 'axios';
import type {Weathers} from './weather.types';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'd966c1d860c86785df1d17dc4ca4efb0';
const LATITUDE = 37.7749;
const LONGITUDE = -122.4194;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    lat: LATITUDE,
    lon: LONGITUDE,
    lang: 'ua',
    units: 'metric',
   
  },
});

export class WeatherServiceApi {
  static getWeather = async (): Promise<Weathers[]> => {
    return api.get('');
  };
}
