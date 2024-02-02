import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Patient } from './features/patients/Patient';
import Appointment from './features/Appointment/Appointment';
import { MainPreSite } from './features/Presite/MainPreSite';
import { Dashboard } from './features/Dashboard/Dashboard';
import '@mantine/core/styles.css';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPreSite />} />
            <Route path="/App/*" element={<App />}>
              {/* Use an index route to render Dashboard */}

              {/* Use a nested route for each tab */}
              <Route path="Dashboard">
                <Route index element={<Outlet />} />
                <Route path="patients" element={<Patient />} />
                <Route path="appointments" element={<Appointment />} />
                {/* Add more routes as needed for other tabs */}
              </Route>
              {/* Redirect /App to /App/Dashboard by default */}
              <Route index element={<Navigate to="Dashboard" />} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
