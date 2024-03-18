import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Paper, Checkbox, Group, Anchor } from '@mantine/core';
import { loginAsync, selectLogged, selectError, selectToken } from './loginSlice'; // Import selectError selector
import { useDisclosure } from '@mantine/hooks';
import styles from '../login/Login.module.css';
import ForgotPass from '../forgotPass/ForgotPass';
import { fetchPatients } from '../../patients/patientSlice';
import { fetchAppointments } from '../../Appointment/appointmentSlice';
import { useSelector } from 'react-redux';

export function Login() {
    const logged = useAppSelector(selectLogged);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectError); // Select the error message from the store
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

    const handleLogin = () => {
        // Dispatch the login action
        dispatch(loginAsync({ username, password }));
    };
    
    return (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{backgroundColor:"#feedd3"}}>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} {/* Display error message if exists */}
            <TextInput
                label="Username"
                placeholder="Username"
                required
                value={username}
                onChange={(event) => setUserName(event.currentTarget.value)}
                
            />
            <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <Group justify="space-between" mt="lg">
                <Anchor component="button" size="sm">
                <ForgotPass></ForgotPass>
                </Anchor>
            </Group>
            <Button fullWidth mt="xl" onClick={handleLogin}>
                Sign in
            </Button>
        </Paper>
    );
}
