import { TextField, Button } from '@mui/material';
import React from 'react';
import { weatherSlice } from '../../features/weatherSlice';
import { useCustomDispatch } from '../../hooks/store';
import { WeatherService } from '../../services/WeatherService';
import Box from '@mui/material/Box';

interface Props {
  city: string,
  setCity: (cityName: string) => void,
}
export const Form = React.memo(function Form({ city, setCity } : Props) {

  const dispatch = useCustomDispatch();

  const handleSubmit = async () => {
    const weatherCity = await WeatherService.getCurrentWeather(city);
    const { data } = weatherCity;
    dispatch(weatherSlice.actions.add(data));
    setCity('');
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete="off"
      onSubmit={async (event: 
        { preventDefault: () => void; 
        }) => {
        event.preventDefault();
        handleSubmit();
      } }
    >
      <TextField
        type="text"
        placeholder='Choose a city'
        value={city}
        onChange={(event) => setCity(event.currentTarget.value)} />
      <Button onClick={handleSubmit}>
        Show weather
      </Button>
    </Box>
  );
});