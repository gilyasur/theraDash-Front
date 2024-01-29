import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { login } from './loginAPI';

import { jwtDecode } from "jwt-decode";

export interface loginState {
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

const initialState: loginState = {
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



export const loginAsync = createAsyncThunk(
  'login/login',
  async (credentials: { username: string; password: string }) => {
    const response = await login(credentials);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        // Assuming your server response includes custom claims like 'first_name' and 'last_name'
        state.token = action.payload.access;
        const decodedToken: any = jwtDecode(state.token);        
        state.logged = true;
        state.status = 'loading';
        state.userfirstName = decodedToken.first_name;
        state.userlastName = decodedToken.last_name;
        state.userEmail = decodedToken.email;
        console.log(decodedToken.email);
        
        

        // Store the token and additional data in localStorage
        localStorage.setItem('token', JSON.stringify(state.token));
        localStorage.setItem('firstName', JSON.stringify(state.userfirstName));
        localStorage.setItem('lastName', JSON.stringify(state.userlastName));
        localStorage.setItem('emai', JSON.stringify(state.userEmail));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // Assuming you have an API call rejection for an expired token scenario
        if (action.error.message === 'Token expired') {
          state.token = ''; // Clear the expired token
          state.logged = false; // Set logged to false
          state.status = 'idle';
          state.userfirstName = undefined; // Clear the additional data
          state.userlastName = undefined;
          state.userEmail = undefined;
          localStorage.removeItem('token'); // Remove the token from localStorage
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          localStorage.removeItem('email');
        }
      });
  },
});

export const selectstatus = (state: RootState) => state.login.status;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectToken = (state: RootState) => state.login.token;
export const selectFirstName = (state: RootState) => state.login.userfirstName;
export const selectLastName = (state: RootState) => state.login.userlastName;
export const selectuserEmail = (state: RootState) => state.login.userEmail;

export default loginSlice.reducer;
