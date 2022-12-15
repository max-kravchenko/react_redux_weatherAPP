import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CityWeatherPage } from './pages/CityWeatherPage';
import { Container } from '@mui/material';


function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />}/>

        <Route path='/:cityName' element={<CityWeatherPage/>}/>
      </Routes>
    </Container>
  );
}

export default App;
