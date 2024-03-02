import { useDispatch, useSelector } from "react-redux";
import { selectProfileImage, selectToken, selectUserID } from "../Presite/login/loginSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";



export function EditProfile() {
    const token = useSelector(selectToken);
    const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
    const navigate = useNavigate();
    const userID = useSelector(selectUserID)
    const [image, setImage] = useState<File | null>(null);
    const profileImage = useSelector(selectProfileImage);
    
    useEffect(() => {
  
      
      if (token) {
        const userIdNumber = Number(userID); // Ensure userID is a primitive number
      //   dispatch(fetchProfile({ token, userID: userIdNumber })); // Pass token and userID as an object
        
      } else {
        navigate('/');
      }
    }, [dispatch, token, userID, navigate]);
    
    
  
    
  
    
  
    return (
      <div>
        <h2>Profile</h2>
        <div>
  
        <img src={`http://127.0.0.1:8000${profileImage}`} alt="Profile"  style={{ width: '80px', height: 'auto' }}/>
  
        </div>
        
      </div>
    );
  }
  