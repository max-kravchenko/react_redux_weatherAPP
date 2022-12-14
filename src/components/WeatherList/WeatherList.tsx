import React from 'react';
import { Weather } from '../../types/types';
import { WeatherCard } from '../WeatherCard/WeatherCard';

interface Props {
  cities: Weather[];
}

export const WeatherList = React.memo(function WeatherList({ cities } : Props) {
  return (
    <section>
      {cities.slice(1).map(weather => (
        <WeatherCard weather={weather} key={weather.weather[0].id}/>
      ))}
    </section>
  );
}); 