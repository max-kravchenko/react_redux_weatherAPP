import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from '../../../app/store';
import { WeatherList } from '../WeatherList';

describe('WeatherList', () => {
  it('should render correctly', () => {
    expect(render(<Provider store={store}>
      < WeatherList cities={[]} />
    </Provider>)).toMatchSnapshot();
  });

  it('should render the weather card', () => {
    render(<HashRouter>
      <Provider store={store}>
        < WeatherList cities={[{main: {
          temp: 1,
          feels_like: 2,
          humidity: 100,
          pressure: 1000,
          temp_max: 10,
          temp_min: 1,
        },
        sys: {
          country: 'Ukraine',
        },
        name: 'Lviv',
        wind: {
          speed: 1,
        },
        weather: [{
          id: 1,
          main: 'Cloud',
          description: 'Cloudy',
          icon: 'isd',
        }]}]} />
      </Provider>;   
    </HashRouter>);

    expect(screen.getByTestId('grid')).toBeInTheDocument();

    screen.debug();
  });
});

