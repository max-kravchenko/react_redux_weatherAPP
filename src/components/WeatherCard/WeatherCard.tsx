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
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

interface Props {
  weather: Weather;
}

export const WeatherCard = React.memo(function WeatherCard({weather} : Props) {

  const dispatch = useCustomDispatch();
  
  const time = new Date().toLocaleString();
  
  return(
    <Card sx={{ maxWidth: 300 }}>
      <NavLink
        style={{ textDecoration: 'none', color: 'black'} }
        to={`../${weather.name}`}
        end
      >
        <CardHeader
          avatar={
            <Avatar aria-label="weather">
              <CardMedia
                component="img"
                image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather logo"
              />
            </Avatar>
          }
          title={`Weather in ${weather.name}`}
          subheader={time}
        />
        <CardContent>
          <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography gutterBottom variant="h3" component="div">
              {Math.floor(weather.main.temp)}°C
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography gutterBottom variant="h3" component="div">
              {weather.weather[0].main}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              {weather.sys.country}, {weather.name}
            </Typography>
          </Box>        
        </CardContent>
      </NavLink> 
     
      <CardActions>
        <Box display='flex' justifyContent='center' 
          gap={12}
        >
          <Button 
            size="small" 
            color="success"
            onClick={async () => {
              const weatherCity = await WeatherService.getCurrentWeather(weather.name);
              const { data } = weatherCity;
              dispatch(weatherSlice.actions.update(data));
            }}
          >
          Refresh
          </Button>
          <Button 
            color="error"
            size="small"
            onClick={async () => {
              dispatch(weatherSlice.actions.remove(weather.name));
            }}
          >
            Remove
          </Button>
        </Box>

      </CardActions>
    </Card>
  );
});