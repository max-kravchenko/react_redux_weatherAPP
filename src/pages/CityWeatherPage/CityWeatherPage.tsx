import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { time } from 'console';
import React, { useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectCurrentWeatherData } from '../../selectors/selector';
import { WeatherService } from '../../services/WeatherService';

export const CityWeatherPage = React.memo(function CityCityWeatherPage() {

  const currentCity = window.location.hash.split('/')[1];

  const { weather, isLoading, error } = useCustomSelector(selectCurrentWeatherData);

  const filteredWeather = weather.filter((city) => city.name === currentCity);
  
  return (
    <Card sx={{ maxWidth: 500 }}>
      <h1>
        Weather in {filteredWeather[0].name} today
      </h1>
      <CardMedia
        component="img"
        image={`http://openweathermap.org/img/wn/${filteredWeather[0].weather[0].icon}.png`}
        alt="weather logo"
      />
      
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {filteredWeather[0].weather[0].main}, {Math.floor(filteredWeather[0].main.temp)}°C
        </Typography>
        <Typography gutterBottom variant="h3" component="div">
          The weather in {filteredWeather[0].name} can be described as following: it is {Math.floor(filteredWeather[0].main.temp)}°C with {filteredWeather[0].weather[0].description} but feels like {Math.floor(filteredWeather[0].main.feels_like)}°C with humidity of {filteredWeather[0].main.humidity}% and pressure of {filteredWeather[0].main.pressure}.

          The speed of wind is {filteredWeather[0].wind.speed} km / hour.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filteredWeather[0].sys.country}, {filteredWeather[0].name}
        </Typography>
      </CardContent>
    </Card>
  );
});