import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { CityWeatherPage } from '../CityWeatherPage';

describe('CityWeatherPage', () => {
  it('should render correctly', () => {
    expect(<Provider store={store}> <CityWeatherPage/></Provider>).toMatchSnapshot();
  });
});
