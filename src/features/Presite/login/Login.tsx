import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import styles from "../login/Login.module.css"
import { selectLogged, loginAsync, forgotPass } from './loginSlice';
import { Button, Modal,TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function Login() {
    const logged = useAppSelector(selectLogged);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Check if the login was successful
        if (logged) {
            // Use navigate to go to the "/App" route
            navigate('/App/Profile');
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
                    <div>
  Password:
  <input
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <label>
    <input
      type="checkbox"
      checked={showPassword}
      onChange={(e) => setShowPassword(e.target.checked)}
    />
    Show password
  </label>
</div>                    <button
                        className={styles.button}
                        onClick={handleLogin}>
                        Login
                    </button>
                </div>
                
            </div>
            
           
           
        </div>
    );
}
