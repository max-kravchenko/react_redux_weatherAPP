import React, { useEffect, useState } from 'react';
import './App.css';
import { WeatherCard } from './components/WeatherCard';
import { useCustomDispatch, useCustomSelector } from './hooks/store';
import { selectCurrentWeatherData } from './selectors/selector';
import { fetchCurrentWeather } from './thunks/fetchCurrentWeather';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Weather } from './types/types';
import { WeatherList } from './components/WeatherList/WeatherList';


function App() {
  const [city, setCity] = useState<string>('Kyiv');

  const [cities, setCities] = useState<Weather[]>([]);

  const { weather } = useCustomSelector(selectCurrentWeatherData);
 
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather(city));
  }, []);

  console.log(cities);

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
          setCities((prevCities: any) => {
            return [
              ...prevCities,
              weather,
            ];
          });
          dispatch(fetchCurrentWeather(city));
        } }>
          Show weather
        </Button>
      </div>

      <WeatherList cities={cities} />
    </div>
  );
}

export default App;
