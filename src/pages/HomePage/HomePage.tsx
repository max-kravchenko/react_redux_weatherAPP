import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { SearchForm } from '../../components/SearchForm';
import { WeatherList } from '../../components/WeatherList';
import { weatherSlice } from '../../features/weatherSlice';
import { useCustomSelector, useCustomDispatch } from '../../hooks/store';
import { selectCurrentWeatherData } from '../../selectors/selector';
import { WeatherService } from '../../services/WeatherService';

export const HomePage = React.memo(function HomePage() {
  const [city, setCity] = useState<string>('');

  const { weather, isLoading, error } = useCustomSelector(selectCurrentWeatherData);
  
  const dispatch = useCustomDispatch();

  useEffect(() => {
    WeatherService.getCurrentWeather(city).then(weather => dispatch(weatherSlice.actions.set([weather])));
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchForm city={city} setCity={setCity}/>
      <WeatherList cities={weather} />
    </div>
  );
});