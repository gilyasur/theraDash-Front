import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import getAppointments from './appointmentAPI ';




interface IAppointment {
  id: number;
  occurrence_date: string;
  time_of_day: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  therapist: {
    username: string;
  };
  patient: {
    id: number
    first_name: string;
    last_name : string;
    email : string;
    phone_number: string;
    date_of_birth : string
    address : string;
    created_at: string;
    updated_at : string;
    day_of_week: string;
    recurring_frequency: string;
    canceled: string;
    cancellation_reason: string;
    price:number ;
  };
}

export interface IAppointmentState {
  appointments: IAppointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IAppointmentState = {
  appointments: [],
  status: 'idle',
  error: null,
};


// const token = localStorage.getItem('token');

export const fetchAppointments = createAsyncThunk<IAppointment[], string>(
  "appointments/fetchAppointments",
  async (token) => {    
    if (!token) {
      throw new Error("Token not found");
    }
    try{

    const response = (await getAppointments(token))
    return response; // Return the array directly
  }catch (error) {
    console.log("error in fetch Appointments", error);
    throw error
    
  }
}

);



const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {

        state.status = 'succeeded';
        state.appointments = action.payload; // Corrected this line
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectAppointments = (state: RootState) => state.appointment.appointments;
export const selectAppointmentsStatus = (state: RootState) => state.appointment.status;
export const selectAppointmentsError = (state: RootState) => state.appointment.error;


export default appointmentsSlice.reducer;
