import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { hourlyWeather, Weather } from '../types/types';

type currentWeather = {
  weather: Weather[],
  isLoading: boolean,
  error: string,
  hourly: hourlyWeather,
};

const initialState: currentWeather = {
  weather: [],
  isLoading: false,
  error: '',
  hourly: {
    list: [
      {
        main: {
          temp: 0,
        },
        weather: [
          {
            icon: '',
          }
        ],
        dt_txt: '',
      }
    ],
    city: {
      name: '',
      country: '',
    }
  },
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
      state.weather = [];
    },
    setLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addHourly: (state, action: PayloadAction<hourlyWeather>) => {
      state.hourly = action.payload;
    },
  },
});

export default weatherSlice.reducer;
export const { actions } = weatherSlice;
