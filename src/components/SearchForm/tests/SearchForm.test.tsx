import React from 'react';
import { SearchForm } from '../SearchForm';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <SearchForm city={''} setCity={function (cityName: string): void {
        throw new Error('Function not implemented.');
      } } />
    </Provider>);
  const input = utils.getByTestId('content-input') as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

test('It should return empty string if no info provided', () => {
  const {input} = setup();
  fireEvent.change(input, {target: {value: ''}});
  expect(input.value).toBe('');
});
