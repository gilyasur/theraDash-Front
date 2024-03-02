import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { login } from './loginAPI';
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { createSelector } from '@reduxjs/toolkit';

;

interface LoginResponse {
  access: string;
}

export interface LoginState {
  username: string;
  password: string;
  status: 'idle' | 'loading' | 'failed';
  token: string;
  logged: boolean;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userProfileImage?: string; // Add field for profile image URL
  userID?: Number;
}

const initialState: LoginState = {
  username: '',
  password: '',
  status: 'idle',
  token: '',
  logged: false,
  userFirstName: undefined,
  userLastName: undefined,
  userEmail: undefined,
  userProfileImage: undefined,
  userID: undefined,
};

const userProfileImageSelector = (state: RootState) => state.login.userProfileImage;

// Memoize the selector function using Reselect
export const selectProfileImage = createSelector(
  userProfileImageSelector,
  (userProfileImage) => userProfileImage // This selector returns userProfileImage directly
);

export const loginAsync = createAsyncThunk(
  'login/login',
  async (credentials: { username: string; password: string }) => {
    const response = await login(credentials);
    return response.data as LoginResponse;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.access;
        const decodedToken: any = jwtDecode(state.token);  
        console.log(decodedToken);
        
        
        state.logged = true;
        state.status = 'loading';
        state.userFirstName = decodedToken.first_name;
        state.userLastName = decodedToken.last_name;
        state.userEmail = decodedToken.email;
        state.userID = decodedToken.id;
        state.userProfileImage = String(decodedToken.profile_image);
        
        
        localStorage.setItem('token', action.payload.access);

        // Fetch profile image after successful login
      })
      .addCase(loginAsync.rejected, (state, action) => {
        if (action.error.message === 'Token expired') {
          state.token = '';
          state.logged = false;
          state.status = 'idle';
          state.userFirstName = undefined;
          state.userLastName = undefined;
          state.userEmail = undefined;
          state.userProfileImage = undefined; // Clear profile image URL
          localStorage.removeItem('token');
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          localStorage.removeItem('email');
        }
      });
  },
});

export const selectStatus = (state: RootState) => state.login.status;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectToken = (state: RootState) => state.login.token;
export const selectFirstName = (state: RootState) => state.login.userFirstName;
export const selectLastName = (state: RootState) => state.login.userLastName;
export const selectUserEmail = (state: RootState) => state.login.userEmail;
export const selectUserID = (state: RootState) => state.login.userID;



export default loginSlice.reducer;
