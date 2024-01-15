import React from 'react';


import './App.css';
import { Login } from './features/login/Login';
import { useAppSelector } from './app/hooks';
import { selectLogged } from './features/login/loginSlice';
import { Patient } from './features/patients/Patient';
import Appointment from './features/Appointment/Appointment';


function App() {
  const logged = useAppSelector(selectLogged);
  return (
    
    <div className="App">
      <div> {logged ? <Appointment></Appointment> : <div>shigaonno</div>}</div>
<Login></Login>
    </div>
  );
}

export default App;
