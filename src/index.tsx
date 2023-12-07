import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WeatherContextWrapper } from './utils/context';
import "./assets/styles/index.scss"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WeatherContextWrapper>
      <App />
    </WeatherContextWrapper>
  </React.StrictMode>
);

