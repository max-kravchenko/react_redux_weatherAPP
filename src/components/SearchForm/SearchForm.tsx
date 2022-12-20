import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { weatherSlice } from '../../features/weatherSlice';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import Box from '@mui/material/Box';
import { selectCurrentWeatherData } from '../../selectors/selector';
import Alert from '@mui/material/Alert';
import { fetchCurrentWeather } from '../../thunks/fetchCurrentWeather';

interface Props {
  city: string,
  setCity: (cityName: string) => void,
}
export const SearchForm = React.memo(function SearchForm({ city, setCity } : Props) {

  const dispatch = useCustomDispatch();
  const { weather, error } = useCustomSelector(selectCurrentWeatherData);

  const [errorCity, setErrorCity] = useState<boolean>(false);
  const [emptyCityErr, setEmptyCityErr] = useState<boolean>(false);

  const handleSubmit = async () => {

    if (city.trim() === '') {
      setEmptyCityErr(true);
      setCity('');
      setTimeout(() => {
        setEmptyCityErr(false);
      }, 3000);
      return;
    }

    if (weather.find((name) => name.name.toLowerCase() === city.toLowerCase())) {
      setCity('');
      setErrorCity(true);

      setTimeout(() => {
        setErrorCity(false);
      }, 3000);
      return;
    }

    try {
      dispatch(weatherSlice.actions.setLoad(true));
      dispatch(fetchCurrentWeather(city));
      setCity('');
      setErrorCity(false);
      dispatch(weatherSlice.actions.setError(''));
      dispatch(weatherSlice.actions.setLoad(true));
    } catch (error: any) {
      dispatch(weatherSlice.actions.setError(error));
    }
    finally {
      dispatch(weatherSlice.actions.setLoad(false));
    }
  };

  const handleCityEnter = (
    event: { currentTarget: { value: string; }}
  ) => setCity(event.currentTarget.value);

  const hanleSelectionClear = () => {
    dispatch(weatherSlice.actions.clear());
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        component='form'
        noValidate
        autoComplete="off"
        onSubmit={async (event: {preventDefault: () => void}
        ) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          inputProps={{ 'data-testid': 'content-input' }}
          type="text"
          placeholder='Choose a city'
          value={city}
          onChange={handleCityEnter} 
        />
        <Button
          onClick={handleSubmit}
          color="success"
          size='large'

        >
        Show weather
        </Button>
        <Button
          onClick={hanleSelectionClear}
          color='error'
          size='small'
        >
        Clear selections
        </Button>
      </Box>

      {errorCity && (<Alert variant="filled" severity="warning">
        This city is already on the list. No need to add it twice
      </Alert>)}

      {emptyCityErr && (<Alert variant="filled" severity="warning">
        Go on, type some letters.
      </Alert>)}

      {error && (<Alert variant="filled" severity="warning">
        Enter correct city name
      </Alert>)}
    </Box>
  );
});