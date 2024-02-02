import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import styles from "../login/Login.module.css"
import { selectLogged, loginAsync } from './loginSlice';

export function Login() {
    const logged = useAppSelector(selectLogged);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Check if the login was successful
        if (logged) {
            // Use navigate to go to the "/App" route
            navigate('/App');
        }
    }, [logged, navigate]);

    const handleLogin = async () => {
        // Dispatch the login action
        await dispatch(loginAsync({ username, password }));
    };

    return (
        <div>
            <div className={styles.row}>
                <div>
                    UserName:<input onChange={(e) => setUserName(e.target.value)} />
                    Password:<input onChange={(e) => setPassword(e.target.value)} />
                    <button
                        className={styles.button}
                        onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
