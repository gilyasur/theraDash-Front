import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, selectProfile } from './profileSlice';
import { selectFirstName, selectLastName, selectProfileImage, selectToken, selectUserID } from "../Presite/login/loginSlice";
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export function Profile() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const profileImage = useSelector(selectProfileImage);
  const userFirstName = useSelector(selectFirstName)
  const userLastName = useSelector(selectLastName)
  const profile = useSelector(selectProfile)
  useEffect(() => {

    
    if (token && typeof userID === 'number') {
        dispatch(fetchProfile({ token, userID })); // Pass token and userID as an object
    } else {
        navigate('/');
    }
    
    
  }, [dispatch, token, userID, navigate]);
  
  

  const HandleCreateProfile =()=> {

  }

  

  return (
    <div>
      <h2>Profile</h2>
      <div>
    
    
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




     <br></br>
        {userFirstName} <span> {userLastName}</span>
      </div>
      
    </div>
  );
}
