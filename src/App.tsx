import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CityWeatherPage } from './pages/CityWeatherPage';
import { Container } from '@mui/material';


function App() {
  return (
    <Container style={{ backgroundColor: 'lightskyblue', height: '100vh'}}>
      <Routes>
        <Route path="/" element={<HomePage />}/>

        <Route path='/:cityName' element={<CityWeatherPage/>}/>
      </Routes>
    </Container>
  );
}

export default App;
