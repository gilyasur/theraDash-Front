import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

import { registerAPI } from './registerAPI';

import { jwtDecode } from "jwt-decode";

export interface registerState {
    username: string;
    password: string;
    status: 'idle' | 'loading' | 'failed';
    token: string;
    logged: boolean;
    // Add additional fields for custom claims
    userfirstName?: string;
    userlastName?: string;
    userEmail?: string;
  }

const initialState: registerState = {
    username: '',
    password: '',
    status: 'idle',
    token: '',
    logged: false,
    // Initialize additional fields
    userfirstName: undefined,
    userlastName: undefined,
    userEmail: undefined,
  };
  




export const registerAsync = createAsyncThunk(
  'Register/postregister',
  async (credentials: { username: string; password: string,first_name:string,last_name:string,email:string  }) => {
    const response = await registerAPI(credentials);
    return response.data;
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        
        
      })  
  },
});



export default registerSlice.reducer;
