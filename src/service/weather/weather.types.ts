export interface Weathers {
  data: {
    cod: string;
    message: number;
    cnt: number;
    list: Weather[];
    city: City;
  };
}

export interface City {
  id: number;
  name: string;
  coordinates: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface List {
  dt_txt: any;
  date: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  probabilityOfPrecipitation: number;
  rain?: Rain;
  system: System;
  dateString: string;
}

export interface System {
  pod: string;
}

export interface Rain {
  precipitationVolumeForLast3Hours: number;
}

export interface Wind {
  speed: number;
  direction: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

interface Weather {
  dt_txt: any;
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: any;
  temperature: number;
  feelsLikeTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  pressure: number;
  seaLevel: number;
  groundLevel: number;
  humidity: number;
  temperatureDifference: number;
}
