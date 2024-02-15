import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

import { register } from './registerAPI';

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
  'login/login',
  async (credentials: { username: string; password: string }) => {
    const response = await register(credentials);
    return response.data;
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
      
  },
});

export const selectstatus = (state: RootState) => state.login.status;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectToken = (state: RootState) => state.login.token;
export const selectFirstName = (state: RootState) => state.login.userfirstName;
export const selectLastName = (state: RootState) => state.login.userlastName;
export const selectuserEmail = (state: RootState) => state.login.userEmail;

export default registerSlice.reducer;
