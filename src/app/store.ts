import { configureStore, combineReducers } from '@reduxjs/toolkit';
import weatherSliceReducer from '../features/weatherSlice';

const rootReducer = combineReducers({
  weatherSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store; 
export type AppDispatch = AppStore['dispatch'];
