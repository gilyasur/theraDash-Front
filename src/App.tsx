import React from 'react';


import './App.css';

import { useAppSelector } from './app/hooks';
import { selectLogged } from './features/Presite/login/loginSlice';


import { Link, Outlet } from 'react-router-dom';
import { Dashboard } from './features/Dashboard/Dashboard';



function App() {
  const logged = useAppSelector(selectLogged);
  return (
    
    <div className="App">

<Dashboard></Dashboard>
    </div>
  );
}

export default App;
