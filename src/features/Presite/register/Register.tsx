import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import styles from "../login/Login.module.css"
import { selectLogged, loginAsync, selectUserID } from '../login/loginSlice';
import { registerAsync } from './registerSlice';
import { useSelector } from 'react-redux';

export function Register() {
    const logged = useAppSelector(selectLogged);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const userID = useSelector(selectUserID)
    useEffect(() => {
        // Check if the login was successful
        if (logged) {
            // Use navigate to go to the "/App" route
            navigate('/App');
        }
    }, [logged, navigate]);

    const handleRegister = async () => {
        // Dispatch the login action
        await dispatch(registerAsync({ username, password, first_name, last_name, email }));
        modifyProfile();
    };

    const modifyProfile = ()=> {
        dispatch(loginAsync({ username, password }))
        navigate ('/App/profile')  

    }
     const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        // Define regular expressions for password validation
        const hasNumber = /\d/.test(newPassword);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        const hasUpperCase = /[A-Z]/.test(newPassword);
    
        // Validate password
        if (
          newPassword.length < 8 ||
          !hasNumber ||
          !hasSpecial ||
          !hasUpperCase
        ) {
          setPasswordError(
            'Password must be at least 8 characters long and contain at least one number, one special character, and one uppercase letter.'
          );
        } else {
          setPasswordError('');
        }
      };
    return (
        <div className={styles.container}>
        <div className={styles.column}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.column}>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

          <label htmlFor="password" > Password:</label>
          
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className={styles.column}>
          <label htmlFor="firstname">First Name:</label>
          <input
            id="firstname"
            type="text"
            onChange={(e) => setfirst_name(e.target.value)}
          />
        </div>
        <div className={styles.column}>
          <label htmlFor="lastname">Last Name:</label>
          <input
            id="lastname"
            type="text"
            onChange={(e) => setlast_name(e.target.value)}
          />
        </div>
        <div className={styles.column}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.column}>
   
  </div>
        <button className={styles.button} onClick={handleRegister}>
          Register
        </button>
      </div>
      

    );
}
