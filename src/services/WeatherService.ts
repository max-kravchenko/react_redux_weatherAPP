import axios, { AxiosResponse } from 'axios';
import { Weather } from '../types/types';

export class WeatherService {
  static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
    return axios.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_APIKEY}`);
  }
}