import React, { useEffect, useState } from 'react';
import './App.css';
import { useCustomDispatch, useCustomSelector } from './hooks/store';
import { selectCurrentWeatherData } from './selectors/selector';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { WeatherList } from './components/WeatherList/WeatherList';
import { weatherSlice } from './features/weatherSlice';
import { WeatherService } from './services/WeatherService';


function App() {
  const [city, setCity] = useState<string>('');

  const { weather, isLoading, error } = useCustomSelector(selectCurrentWeatherData);

  const dispatch = useCustomDispatch();

  useEffect(() => {
    WeatherService.getCurrentWeather(city).then(weather => dispatch(weatherSlice.actions.set([weather])));
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Weather App</h1>
        <TextField 
          type="text" 
          placeholder='Choose a city' 
          value={city} 
          onChange={(event) => setCity(event.currentTarget.value)}
        />
        <Button onClick={async () => {
          const weatherCity = await WeatherService.getCurrentWeather(city);
          const { data } = weatherCity;
          dispatch(weatherSlice.actions.add(data));
          setCity('');
        } }>
          Show weather
        </Button>
      </div>

      <WeatherList cities={weather} />
    </div>
  );
}

export default App;
