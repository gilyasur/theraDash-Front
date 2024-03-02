import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { IProfile, createProfile, fetchProfile, selectProfile } from './profileSlice';
import { selectFirstName, selectLastName, selectLogged, selectProfileImage, selectToken, selectUserID } from "../Presite/login/loginSlice";
import { RootState } from '../../app/store';

export function Profile() {
  const token = useSelector(selectToken);
  const logged = useSelector(selectLogged);
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID)
  const profileImage = useSelector(selectProfileImage);
  const userFirstName = useSelector(selectFirstName)
  const userLastName = useSelector(selectLastName)
  const profileState = useSelector(selectProfile);

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
      
      

    } else {
      navigate('/');
    }
  }, [dispatch, token, userID, navigate]);
  
  
  
 
  return (
    <div>
       
      <h2>Profile</h2>
      <div>
      {profileState.profile && profileState.profile.length > 0 ? (
  <div>
    <p>User ID: {profileState.profile[0].user_id}</p>
    <p>Title: {profileState.profile[0].title}</p>
  </div>
) : (
  <div>No profile data available</div>
)}




        <div>
          <p>{userFirstName}</p>
          <p>{userLastName}</p>
          {profileImage !== "null" ? (
            <img
              src={`http://127.0.0.1:8000${profileImage}`}
              alt="Profile"
              style={{ width: '80px', height: 'auto' }}
            />
          ) : (
            <div>
              <input type='file' />
              <label>Image</label>
            </div>
          )}
        </div>
        <br />
        {userFirstName} <span> {userLastName}</span>
      </div>
    </div>
  );
}
