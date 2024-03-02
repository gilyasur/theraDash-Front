import React from 'react';
import { Link, redirect } from "react-router-dom";


import { Login } from './login/Login';
import { useSelector } from 'react-redux';
import { selectLogged } from './login/loginSlice';
import { Register } from './register/Register';



export function MainPreSite() {
    const logged = useSelector(selectLogged)
    return (
        <div>
            premainsite
            <Login></Login>
            or Register?
            <Link to="/register">Register</Link>             

        </div>
    );
}