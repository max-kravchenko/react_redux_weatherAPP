import { AppDispatch } from '../app/store';
import { weatherSlice } from '../features/weatherSlice';
import { WeatherService } from '../services/WeatherService';

export const fetchCurrentWeather = (payload: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(weatherSlice.actions.fetchCurrentWeather());
    const res = await WeatherService.getCurrentWeather(payload);

    if(res.status === 200) {
      dispatch(weatherSlice.actions.fetchCurrentWeatherSucces(res));
    } else {
      dispatch(weatherSlice.actions.fetchCurrentWeatherError(res));
    }
  } catch (error) {
    console.log(error);
  }
}; 