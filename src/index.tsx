import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';



const container = document.getElementById('root')!;
const root = createRoot(container);

const persistor = persistStore(store);

root.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>
);

reportWebVitals();
