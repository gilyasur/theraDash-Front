import axios from "axios";
import { log } from "console";
import { createAsyncThunk } from '@reduxjs/toolkit';

const MY_SERVER ="http://127.0.0.1:8000/profiles/"


const getProfile = async (token: string, userID: number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
    try {
      const response = await axios.get(`${MY_SERVER}${userID}`, config);       
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  

const createProfileAPI = async (token: string, userID: number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.post(`${MY_SERVER}create/${userID}/`, config); 
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editProfileAPI = async (token: string, formData: FormData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  
    try {
      let serverADD = "http://127.0.0.1:8000/edit_profile/";
      const response = await axios.patch(`${serverADD}`, formData, config);
      console.log("API Response:", response.data); // Log the response data
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  


export { getProfile,createProfileAPI,editProfileAPI};


