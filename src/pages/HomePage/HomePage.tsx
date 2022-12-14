import React, { useState } from 'react';
import { SearchForm } from '../../components/SearchForm';
import { WeatherList } from '../../components/WeatherList';
import { useCustomSelector } from '../../hooks/store';
import { selectCurrentWeatherData } from '../../selectors/selector';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export const HomePage = React.memo(function HomePage() {
  const [city, setCity] = useState<string>('');

  const { weather, isLoading, error } = useCustomSelector(selectCurrentWeatherData);

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
        <SearchForm city={city} setCity={setCity}/>
      </Box>
      <WeatherList cities={weather} />
    </Container>
  );
});