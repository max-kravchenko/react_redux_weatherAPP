import { AppDispatch } from '../app/store';
import { weatherSlice } from '../features/weatherSlice';
import { WeatherService } from '../services/WeatherService';

export const fetchCurrentWeather = (payload: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await WeatherService.getCurrentWeather(payload);

    if(res) {
      dispatch(weatherSlice.actions.add(res));
    } 
    
  } catch (error) {
    console.log(error);
  }
}; 