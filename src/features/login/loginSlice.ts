import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login } from './loginAPI';


export interface loginState {
  username: string;
  password:string
  status: 'idle' | 'loading' | 'failed';
  token:string
  logged:boolean
}

const initialState: loginState = {
    username: '',
    password: '',
    status: 'idle',
    token: '',
    logged: false
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
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state,action) => {
        state.token=action.payload.access
        state.logged=true
        state.status = 'loading';
        sessionStorage.setItem('token', JSON.stringify(state.token));
    })
    .addCase(loginAsync.rejected, (state, action) => {
        // Assuming you have an API call rejection for expired token scenario
        if (action.error.message === 'Token expired') {
          state.token = ''; // Clear the expired token
          state.logged = false; // Set logged to false
          state.status = 'idle';
          sessionStorage.removeItem('token'); // Remove the token from sessionStorage
        }
      });
  },
});


export const selectstatus = (state: RootState) => state.login.status;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectToken = (state: RootState) => state.login.token;
export default loginSlice.reducer;