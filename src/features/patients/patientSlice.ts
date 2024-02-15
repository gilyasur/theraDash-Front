import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import {  createPatient, getPatient } from './patientAPI'; // Import the new function


export interface Ipatient {
  id:number;
  therapist: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  address: string;
  price:string;
  day_of_week:string;
}

export interface IpatientState {
  patients: Ipatient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IpatientState = {
  patients: [],
  status: 'idle',
  error: null,
};

export const fetchPatients = createAsyncThunk<Ipatient[], string>(
  'patients/fetchPatients',
  async (token) => {
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await getPatient(token);
      return response;
    } catch (error) {
      console.error('Error in fetchPatients:', error);
      throw error;
    }
  }
);



export const addPatient = createAsyncThunk<Ipatient, { token: string, patientData: Ipatient }>(
  'patients/addPatient',
  async ({ token, patientData }) => {
    try {
      const response = await createPatient(token, patientData);
      return response;
    } catch (error) {
      console.error('Error in addPatient:', error);
      throw error;
    }
  }
);


const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        console.log('fetchPatients.pending');
        state.status = 'loading';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        console.log('fetchPatients.fulfilled');
        state.status = 'succeeded';
        state.patients = action.payload.map((patient) => ({
          ...patient,
          therapist: Number(patient.therapist),
        }));
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        console.log('fetchPatients.rejected');
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        console.log('addPatient.fulfilled');
        state.status = 'succeeded';
        state.patients.push(action.payload); // Add the new patient to the state
      })
      .addCase(addPatient.rejected, (state, action) => {
        console.log('addPatient.rejected');
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectPatients = (state: RootState) => state.patient.patients;
export const selectPatientsStatus = (state: RootState) => state.patient.status;
export const selectPatientsError = (state: RootState) => state.patient.error;

export default patientSlice.reducer;
