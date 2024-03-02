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
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  

  

  export { getProfile};


