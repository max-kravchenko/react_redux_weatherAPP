import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useCustomSelector } from '../../hooks/store';
import { selectCurrentWeatherData } from '../../selectors/selector';
import Box from '@mui/material/Box';

export const CityWeatherPage = React.memo(function CityCityWeatherPage() {

  const currentCity = window.location.hash.split('/')[1];

  console.log(currentCity);

  const { weather, isLoading, error } = useCustomSelector(selectCurrentWeatherData);

  const filteredWeather = weather.filter((city) => city.name === currentCity.split('%20').join(' '));
  
  return (
    <Card>
      <Typography variant="h3" paddingTop={4}>
        Weather in {filteredWeather[0].name} today
      </Typography>
      <CardContent>
        <Box
          maxWidth={200}
          display="flex"
          justifyContent='space-between'
          alignItems='center'
        >
          <CardMedia
            component="img"
            image={`http://openweathermap.org/img/wn/${filteredWeather[0].weather[0].icon}.png`}
            alt="weather logo"
          />
          <Box
            display="flex"
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
          >
            <Typography variant="h5" >
              {filteredWeather[0].weather[0].main}
            </Typography>
            <Typography variant="h5" >
              {Math.floor(filteredWeather[0].main.temp)}°C
            </Typography>
          </Box> 
        </Box>
        <Typography gutterBottom variant="body1" component="div">
          The current weather in {filteredWeather[0].name} can be described as following: it is {Math.floor(filteredWeather[0].main.temp)}°C with {filteredWeather[0].weather[0].description} but feels like {Math.floor(filteredWeather[0].main.feels_like)}°C with humidity of {filteredWeather[0].main.humidity}% and pressure of {filteredWeather[0].main.pressure} atm.
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          The speed of wind is {filteredWeather[0].wind.speed} km / hour.
        </Typography>
        <Typography>
          Highs today are around {Math.floor(filteredWeather[0].main.temp_max)}°C, while lows are at {Math.floor(filteredWeather[0].main.temp_min)}°C.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filteredWeather[0].sys.country}, {filteredWeather[0].name}
        </Typography>
      </CardContent>
    </Card>
  );
});