import React, { useEffect, useState } from 'react';
import './App.css';
import { useCustomDispatch, useCustomSelector } from './hooks/store';
import { selectCurrentWeatherData } from './selectors/selector';
import { WeatherList } from './components/WeatherList/WeatherList';
import { weatherSlice } from './features/weatherSlice';
import { WeatherService } from './services/WeatherService';
import { Form } from './components/Form';


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
        <Form city={city} setCity={setCity}/>
      </div>

      <WeatherList cities={weather} />
    </div>
  );
}

export default App;
