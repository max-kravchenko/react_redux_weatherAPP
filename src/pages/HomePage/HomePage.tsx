import React, { useEffect, useState } from 'react';
import { SearchForm } from '../../components/SearchForm';
import { WeatherList } from '../../components/WeatherList';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectCurrentWeatherData } from '../../selectors/selector';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { weatherSlice } from '../../features/weatherSlice';

export const HomePage = React.memo(function HomePage() {
  const [city, setCity] = useState<string>('');

  const dispatch = useCustomDispatch();

  const { weather } = useCustomSelector(selectCurrentWeatherData);

  useEffect(() => {
    dispatch(weatherSlice.actions.set(weather));
  }, []);

  return (
    <Container>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography gutterBottom variant="h2">
      Weather App
        </Typography>
      </Box>

      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingBottom={4}
      >
        <SearchForm city={city} setCity={setCity} />
      </Box>
      <WeatherList cities={weather} />
    </Container>
  );
});