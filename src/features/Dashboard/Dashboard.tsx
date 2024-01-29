import React from 'react';
import { Link, Outlet, redirect } from "react-router-dom";


import { Login } from '../Presite/login/Login';
import { useSelector } from 'react-redux';
import { selectLogged } from '../Presite/login/loginSlice';
import { Header } from '../Header/Header';

import { MantineProvider } from '@mantine/core';


export function Dashboard() {
    const logged = useSelector(selectLogged)
    return (
        <div>
            
 <Header></Header>

        </div>
    );
}