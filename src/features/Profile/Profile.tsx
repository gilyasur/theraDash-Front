import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { IProfile, createProfile, fetchProfile, selectEditedImageProfile, selectProfile } from './profileSlice';
import { selectFirstName, selectLastName, selectLogged, selectProfileImage, selectToken, selectUserDob, selectUserEmail, selectUserID } from "../Presite/login/loginSlice";
import { RootState } from '../../app/store';
import { Card, Avatar, Text, Group, Button } from '@mantine/core';
import classes from './profile.module.css';
import { fetchPatients, selectPatients } from '../patients/patientSlice';
import { fetchAppointments, selectAppointments } from '../Appointment/appointmentSlice';

export function Profile() {
  const token = useSelector(selectToken);
  const logged = useSelector(selectLogged);
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID)
  const profileImage = useSelector(selectProfileImage);
  const userFirstName = useSelector(selectFirstName)
  const userLastName = useSelector(selectLastName)
  const editedProfileImage: string | null = useSelector(selectEditedImageProfile)?.editedprofileImage ?? null;
  const [updatedProfileImage, setUpdatedProfileImage] = useState<string | null>(null);
  const patients = useSelector(selectPatients)
  const appointments = useSelector(selectAppointments)
  const activePatients = patients.filter(patient => !patient.canceled);
  const userEmail = useSelector(selectUserEmail)
  const userDob = useSelector(selectUserDob)
  const stats = [
    { value: `${activePatients.length}`, label: 'Total Active Patients' },
    { value: `${appointments.length}`, label: 'Total Appointments' },
  ];
  

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1} style={{fontWeight:"bold"}}>
        {stat.label}
      </Text>
    </div>
  ));

  useEffect(() => {
    if (token && typeof userID === 'number') {
      dispatch(fetchProfile({ token, userID })).then((action) => {
        if (action.type === fetchProfile.fulfilled.type) {
          // Profile fetched successfully, no need to create profile

        } else {
          // Profile not found, create it
          dispatch(createProfile({ token, userID }));
        }
      });
      
      dispatch(fetchPatients(token));
      dispatch(fetchAppointments(token));  

    } else {
      navigate('/');
    }
  }, [dispatch, token, userID, navigate]);
  
  useEffect(() => {
    // Update the profile image whenever editedProfileImage changes
    setUpdatedProfileImage(editedProfileImage);
    console.log(updatedProfileImage);
    
  }, [editedProfileImage]);
  const userDobDate = new Date(userDob);

  
 
  return (

       <div className={classes.bodySize}>
  <div className={classes.headerContainer}>
    
    <h2 className={classes.header}>Profile</h2>
     
      <br></br>

     



         


      <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={70}
        style={{

        }}
      />
       {profileImage !== "null" ? (
            <Avatar
            src={updatedProfileImage ? `http://127.0.0.1:8000${updatedProfileImage}` : `http://127.0.0.1:8000${profileImage}`}              alt="Profile"
              style={{ width: '80px', height: 'auto' }}
              size={80}
              radius={80}
              mx="auto"
              mt={-30}
              className={classes.avatar}
            />
          ) : (
            <div>
             
            </div>
          )}
   
      <Text ta="center" fz="lg" fw={500} mt="sm">

        {userFirstName} {userLastName}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        Therapist
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
       <span style={{fontWeight:"bold",color:"black"}}>Email:&nbsp;</span>  {userEmail}
      </Text>

<Text ta="center" fz="sm" c="dimmed">
<span style={{fontWeight:"bold",color:"black"}}>Date of Birth:&nbsp;</span> 
  {userDobDate.toLocaleDateString('en-GB')} {/* 'en-GB' represents the British English locale */}
</Text>
      
      <Group mt="md" justify="center" gap={30}>
        {items}
      </Group>
    
    </Card>
  
    </div>
    </div>

  );
}
