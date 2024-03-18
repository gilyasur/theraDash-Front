import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { forgotPassAPI, login, resetPassAPI } from './loginAPI';

import { jwtDecode } from "jwt-decode";
import { createSelector } from '@reduxjs/toolkit';

import {  PayloadAction } from '@reduxjs/toolkit';


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
  error: string | null; // Add error property to the state
  userDOB?:any;

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
  userDOB:undefined,
  error: null, // Initialize error as null

};

const userProfileImageSelector = (state: RootState) => state.login.userProfileImage;
export const selectError = (state: RootState) => state.login.error; 

// Memoize the selector function using Reselect
export const selectProfileImage = createSelector(
  (state: RootState) => state.login.userProfileImage,
  (userProfileImage) => userProfileImage
);

export const loginAsync = createAsyncThunk(
  'login/login',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await login(credentials);
      return response.data as LoginResponse;
    } catch (error) {
      throw error;
    }
  }
);

export const logOut = createAsyncThunk<void, void, { state: RootState }>(
  'logOut/logOut',
  async (_, { getState, dispatch }) => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    
    // Dispatch an action to update the logged state to false
    dispatch(loginSlice.actions.setLogged(false));
  }
);

export const forgotPass = createAsyncThunk(
  'forgotPass/forgotPass',
  async (credentials: { username: string }) => {
    const response = await forgotPassAPI(credentials);
    return response.data; // No need for type assertion since response.data should match LoginResponse
  }
);

export const resetPass = createAsyncThunk(
  'resetPass/resetPass',
  async (credentials: { id:number, new_password: string,username:string }) => {
    const response = await resetPassAPI(credentials);
    return response.data; // No need for type assertion since response.data should match LoginResponse
  }
);


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      state.userProfileImage = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => { // Add setError reducer
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.access;
        const decodedToken: any = jwtDecode(state.token);  
        state.logged = true;
        state.status = 'loading';
        state.userFirstName = decodedToken.first_name;
        state.userLastName = decodedToken.last_name;
        state.userEmail = decodedToken.email;
        state.userID = decodedToken.id;
        state.userDOB = decodedToken.dob;
        state.userProfileImage = String(decodedToken.profile_image);
       
        
        localStorage.setItem('token', action.payload.access);

        // Fetch profile image after successful login
      })
     
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = 'Login failed. Please check your credentials.';
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
export const selectUserDob = (state: RootState) => state.login.userDOB;

export const { setLogged,updateProfileImage, setError } = loginSlice.actions;

export default loginSlice.reducer;
