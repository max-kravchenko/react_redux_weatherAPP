import React from 'react';
import { SearchForm } from '../SearchForm';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <SearchForm city={'Kyiv'} setCity={function (cityName: string): string {
          return cityName;
        }} />
      </Provider>);
    const input = utils.getByTestId('content-input') as HTMLInputElement;
    return {
      input,
      ...utils,
    };
  };

  it('should return city name', () => {
    const {input} = setup();
    expect(input.value).toBe('Kyiv');
  });

  it('should render correctly', () => {
    expect(render( <Provider store={store}>
      <SearchForm city={'Kyiv'} setCity={function (cityName: string): string {
        return cityName;
      }} />
    </Provider>)).toMatchSnapshot();
  });  

  it('calls setCity callback handler', async () => {
    const setCity = jest.fn();

    render( <Provider store={store}>
      <SearchForm city={''} setCity={setCity} />
    </Provider>);

    await userEvent.type(screen.getByRole('textbox'), 'Rivne');

    expect(setCity).toHaveBeenCalledTimes(5);
  });
});



