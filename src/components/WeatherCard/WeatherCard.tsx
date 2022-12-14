import React from 'react';
import { Weather } from '../../types/types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCustomDispatch } from '../../hooks/store';
import { weatherSlice } from '../../features/weatherSlice';
import { WeatherService } from '../../services/WeatherService';
import { NavLink } from 'react-router-dom';


interface Props {
  weather: Weather;
}

export const WeatherCard = React.memo(function WeatherCard({weather} : Props) {

  const dispatch = useCustomDispatch();
  
  const time = new Date().toLocaleString();
  
  return(
    <Card sx={{ maxWidth: 345 }}>
      <NavLink
        to={`../${weather.name}`}
        end
      >
        <CardMedia
          component="img"
          image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="weather logo"
        />
      
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {Math.floor(weather.main.temp)}°C
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            {weather.weather[0].main}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {weather.sys.country}, {weather.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Time: {time}
          </Typography>
        </CardContent>
      </NavLink> 
     
      <CardActions>
        <Button 
          size="small" 
          onClick={async () => {
            const weatherCity = await WeatherService.getCurrentWeather(weather.name);
            const { data } = weatherCity;
            dispatch(weatherSlice.actions.update(data));
          }}
        >
          Refresh
        </Button>
        <Button size="small">Learn more</Button>
        <Button 
          size="small"
          onClick={async () => {
            dispatch(weatherSlice.actions.remove(weather.name));
          }}
        >
            Remove
        </Button>
      </CardActions>
    </Card>
  );
});