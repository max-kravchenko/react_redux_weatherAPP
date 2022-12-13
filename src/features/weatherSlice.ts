import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Weather } from '../types/types';

type currentWeather = {
  weather: Weather,
  isLoading: boolean,
  response: Response,
};

type Response = {
  status: number,
  message: string,
};

const initialState: currentWeather = {
  weather: {
    main: {
      temp: 0,
    },
    sys: {
      country: '',
    },
    name: '',
    weather: [{
      id: 0,
      main: '',
      description: '',
      icon: '',
    }]
  },
  isLoading: false,
  response: {
    status: 0,
    message: '',
  },
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchCurrentWeather(state) {
      state.isLoading = true;
    },
    fetchCurrentWeatherSucces(state, action: PayloadAction<AxiosResponse<Weather>>) {
      state.weather = action.payload.data;
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCurrentWeatherError(state, action: PayloadAction<AxiosResponse<Weather>>) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    }
  }
});

export default weatherSlice.reducer;