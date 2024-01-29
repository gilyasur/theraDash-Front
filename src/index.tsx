import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Patient } from './features/patients/Patient';
import Appointment from './features/Appointment/Appointment';
import { MainPreSite } from './features/Presite/MainPreSite';
import { Dashboard } from './features/Dashboard/Dashboard';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPreSite />} />
            <Route path="/App" element={<App />}>
              <Route path="/App/Dashboard" element={<Dashboard />} />
              <Route path="/App/patients" element={<Patient />} />
              <Route path="/App/appointments" element={<Appointment />} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
