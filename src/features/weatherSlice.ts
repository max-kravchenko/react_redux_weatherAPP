import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Weather } from '../types/types';

type currentWeather = {
  weather: Weather[],
  isLoading: boolean,
  error: string,
};

const initialState: currentWeather = {
  weather: [{
    main: {
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
    name: '',
    wind: {
      speed: 0,
    },
    weather: [{
      id: 0,
      main: '',
      description: '',
      icon: '',
    }]
  }],
  isLoading: false,
  error: '',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Weather[]>) => {
      state.weather = action.payload;
    },
    add: (state, action: PayloadAction<Weather>) => {
      state.weather.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.weather = state.weather.filter(weather => weather.name !== action.payload); 
    },
    update: (state, action: PayloadAction<Weather>) => {
      const index = state.weather.findIndex(weather => weather.name === action.payload.name); 

      const newArray = [...state.weather];
     
      newArray[index] = action.payload;

      state.weather = newArray;
    },
    clear: (state) => {
      state.weather = [{main: {
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
      name: '',
      wind: {
        speed: 0,
      },
      weather: [{
        id: 0,
        main: '',
        description: '',
        icon: '',
      }]}];
    },
    setLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default weatherSlice.reducer;
export const { actions } = weatherSlice;
