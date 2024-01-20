import React from 'react';


import './App.css';

import { useAppSelector } from './app/hooks';
import { selectLogged } from './features/Presite/login/loginSlice';


import { Link, Outlet } from 'react-router-dom';


function App() {
  const logged = useAppSelector(selectLogged);
  return (
    
    <div className="App">
<Link to="patients">Patients</Link>
<Link to="appointments">Appointments</Link>
<Outlet></Outlet>

    </div>
  );
}

export default App;
