import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CityWeatherPage } from './pages/CityWeatherPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>

        <Route path='/:cityName' element={<CityWeatherPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
