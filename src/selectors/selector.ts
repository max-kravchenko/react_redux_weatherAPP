import { RootState } from '../app/store';

export const selectCurrentWeatherData = (state: RootState) => state.weatherSliceReducer;