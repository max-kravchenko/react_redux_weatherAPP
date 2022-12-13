import React from 'react';
import { Weather } from '../../types/types';
import { WeatherCard } from '../WeatherCard/WeatherCard';

interface Props {
  cities: Weather[];
}

export const WeatherList = ({ cities } : Props) => {
  return (
    <section>
      {cities.map(weather => (
        <WeatherCard weather={weather} key={weather.weather[0].id}/>
      ))}
    </section>
  );
};