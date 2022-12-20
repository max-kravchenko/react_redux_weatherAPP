import { AppDispatch } from '../app/store';
import { weatherSlice } from '../features/weatherSlice';
import { WeatherService } from '../services/WeatherService';

export const fetchCurrentWeather = (payload: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await WeatherService.getCurrentWeather(payload);

    const { data } = res; 

    if(res) {
      if (data.name === 'São Paulo') {
        data.name = 'Sao Paulo';
      }

      dispatch(weatherSlice.actions.add(data));
    } 
    
  } catch (error: any) {
    dispatch(weatherSlice.actions.setError(error));
  }
  finally {
    dispatch(weatherSlice.actions.setLoad(false));
  }
}; 