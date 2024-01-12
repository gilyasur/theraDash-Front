import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { patient } from '../patients/patientAPI';
import { getAppointment} from './appointmentAPI ';


export interface appointmentState {
  
}

const initialState: appointmentState = {
   
};

export const appointmentAsync = createAsyncThunk(
  'appointment/appointment',
  async (credentials: { username: string; password: string }) => {
    const response = await getAppointment(credentials);
    return response.data;
  }
);

export const appointmentSlice = createSlice({
  name: 'appointment',
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
export default appointmentSlice.reducer;