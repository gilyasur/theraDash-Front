import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import getPatient from './patientAPI';



export interface IpatientState {
  
}

const initialState: IpatientState = {
   
};

export const patientAsync = createAsyncThunk(
  'patient/patient',
  async (credentials: { username: string; password: string }) => {
    const response = await getPatient(credentials);
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