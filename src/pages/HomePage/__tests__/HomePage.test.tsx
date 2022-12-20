import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { HomePage } from '../HomePage';

describe('Homepage', () => {
  it('should enter value correctly', async () => {
    render(<Provider store={store}> <HomePage/> </Provider>);

    expect(screen.queryByText(/Rivne/)).toBeNull();

    await userEvent.type(screen.getByRole('textbox'), 'Rivne');

    expect(
      screen.getByRole('textbox').value).toBe('Rivne');
  });

  it('should render page correctly', () => {
    expect(render(<Provider store={store}> <HomePage/> </Provider>)).toMatchSnapshot();
  });
});
