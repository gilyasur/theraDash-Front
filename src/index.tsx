import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Patient } from './features/patients/Patient';
import Appointment from './features/Appointment/Appointment';
import { MainPreSite } from './features/Presite/MainPreSite';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<MainPreSite />}>
          </Route>
          <Route path="/App" element={<App />} >
          <Route path="patients" element={<Patient />} />
          <Route path="appointments" element={<Appointment />} />
          
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
