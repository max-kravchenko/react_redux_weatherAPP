/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Weather } from '../../types/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { weatherSlice } from '../../features/weatherSlice';
import { WeatherService } from '../../services/WeatherService';
import { NavLink } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { selectCurrentWeatherData } from '../../selectors/selector';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  weather: Weather;
}

export const WeatherCard = React.memo(function WeatherCard({weather} : Props) {

  const dispatch = useCustomDispatch();

  const { isLoading } = useCustomSelector(selectCurrentWeatherData);
  
  const time = new Date().toLocaleString();

  useEffect(() => {
    try {
      dispatch(weatherSlice.actions.setLoad(true));
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(weatherSlice.actions.setError(''));
      dispatch(weatherSlice.actions.setLoad(false));
    }
  }, []);

  const handleWeatherRefresh = async () => {
    try {
      const weatherCity = await WeatherService.getCurrentWeather(weather.name);
      const { data } = weatherCity;
      dispatch(weatherSlice.actions.update(data));
      dispatch(weatherSlice.actions.setLoad(true));
    } catch (error: any) {
      dispatch(weatherSlice.actions.setError(error));
    } finally {
      dispatch(weatherSlice.actions.setLoad(false));
    }
  };

  const handleCardRemoval = async () => {
    dispatch(weatherSlice.actions.remove(weather.name));
  };

  if (isLoading) {
    return (<CircularProgress color="success" />);
  }
  
  return(
    <Card sx={{ minWidth: 230 }}>
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
     
      <Box display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' 
          gap={6}
        >
          <Button 
            size="small" 
            color="success"
            onClick={handleWeatherRefresh}
          >
          Refresh
          </Button>
          <Button 
            color="error"
            size="small"
            onClick={handleCardRemoval}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Card>
  );
});