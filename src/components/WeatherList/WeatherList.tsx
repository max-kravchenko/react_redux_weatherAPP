import React from 'react';
import { Weather } from '../../types/types';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import Grid from '@mui/material/Grid';

interface Props {
  cities: Weather[];
}

export const WeatherList = React.memo(function WeatherList({ cities } : Props) {
  return (
    <Grid container spacing={4}>
      {cities.slice(1).map(weather => (
        <Grid item xs={12} sm={6} md={3} key={weather.weather[0].id + Math.random()}>
          <WeatherCard weather={weather} key={weather.weather[0].id}/>
        </Grid>
      ))}
    </Grid>
  );
}); 