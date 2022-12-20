import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectCurrentWeatherData } from '../../selectors/selector';
import { fetchHourlyWeather } from '../../thunks/fetchCurrentWeather';
import Grid from '@mui/material/Grid';


export const CityWeatherPage = React.memo(function CityCityWeatherPage() {

  const currentCity = window.location.hash.split('/')[1];

  const dispatch = useCustomDispatch();

  const { weather, hourly } = useCustomSelector(selectCurrentWeatherData);

  const filteredWeather = weather
    .filter((city) => city.name === currentCity
      .split('%20')
      .join(' '));

  useEffect(() => {
    dispatch(fetchHourlyWeather(currentCity));
  }, []);

  const { list } = hourly;
  
  return (
    <Card>
      <Typography variant="h3" paddingTop={4}>
        Weather in {filteredWeather[0].name} today
      </Typography>

      <Grid container spacing={4} paddingTop={12} paddingLeft={5}>
        {list.map((item) => (
          <Grid item key={item.main.temp * Math.random()} style={{ transform: `translateY(${-item.main.temp * 3}px)`}}>
            {Math.floor(item.main.temp)}°C
            <CardMedia
              component="img"
              image={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="weather logo"
            />
            <Typography variant="body2" color="text.secondary">
              {(item.dt_txt).split(' ')[1]}
            </Typography>
          </Grid>
        ))
        }
      </Grid>

      <CardContent>
        <Typography gutterBottom variant="body1" component="div" paddingTop={12}>
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