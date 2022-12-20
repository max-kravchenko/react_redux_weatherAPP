import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { HashRouter } from 'react-router-dom';

describe('WeatherCard', () => {
  it('should render correctly', () => {
    expect(render(
      <HashRouter>
        <Provider store={store}> 
          <WeatherCard weather={{main: {
            temp: 0,
            feels_like: 0,
            humidity: 0,
            pressure: 0,
            temp_max: 0,
            temp_min: 0,
          },
          sys: {
            country: '',
          },
          name: 'Rivne',
          wind: {
            speed: 0,
          },
          weather: [{
            id: 0,
            main: '',
            description: '',
            icon: '',
          }]}}/> 
        </Provider>
      </HashRouter> ));
  
    expect(screen.getByRole('link')).toBeInTheDocument();
  
    expect(screen.getByRole('img')).toBeInTheDocument();
  
    expect(screen.getByText(/°C/)).toBeInTheDocument();

    expect(screen.getByText(/Weather in Rivne/)).toBeInTheDocument();

    expect(screen.getByText(/Refresh/)).toBeInTheDocument();

    expect(screen.getByText(/Remove/)).toBeInTheDocument();
  });
});
