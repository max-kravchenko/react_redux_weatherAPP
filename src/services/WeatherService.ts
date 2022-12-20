import axios from 'axios';
import { Weather } from '../types/types';

export class WeatherService {
  static getCurrentWeather(city: string): Promise<Weather> {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_APIKEY}`);
  }

  static getHourlyWeather(city: string): Promise<Weather> {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&&cnt=8&appid=${process.env.REACT_APP_WEATHER_APIKEY}`);
  }
}