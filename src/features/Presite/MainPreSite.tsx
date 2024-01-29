import React from 'react';
import { redirect } from "react-router-dom";


import { Login } from './login/Login';
import { useSelector } from 'react-redux';
import { selectLogged } from './login/loginSlice';



export function MainPreSite() {
    const logged = useSelector(selectLogged)
    return (
        <div>
            premainsite
            <Login></Login>
            

        </div>
    );
}