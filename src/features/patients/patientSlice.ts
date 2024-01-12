import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { patient } from './patientAPI';


export interface patientState {
  
}

const initialState: patientState = {
   
};

export const patientAsync = createAsyncThunk(
  'patient/patient',
  async (credentials: { username: string; password: string }) => {
    const response = await patient(credentials);
    return response.data;
  }
);

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
     
    
  },
});


export const selectstatus = (state: RootState) => state.login.status;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectToken = (state: RootState) => state.login.token;
export default patientSlice.reducer;