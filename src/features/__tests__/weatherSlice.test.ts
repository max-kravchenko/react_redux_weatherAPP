import { store } from '../../app/store';

describe('weatherSlice', () => {
  it('should initially set weather to an initial object with init values', () => {
    const state = store.getState().weatherSliceReducer;
    expect(state.weather).toEqual([]);
  });
  
  it('should initially set isLoading to false', () => {
    const state = store.getState().weatherSliceReducer.isLoading;
    expect(state).toEqual(false);
  });
  
  it('should initially set error to blanc', () => {
    const state = store.getState().weatherSliceReducer.error;
    expect(state).toEqual('');
  });  
});

