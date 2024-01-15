import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import getAppointments from './appointmentAPI ';
import { selectToken } from '../login/loginSlice';



interface IAppointment {
  id: number;
  recurring_frequency: string;
  day_of_week?: string | null;
  time_of_day: string;
  location?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  therapist: {
    username: string;
  };
  patient: {
    first_name: string;
    last_name : string;
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


// const token = sessionStorage.getItem('token');

export const fetchAppointments = createAsyncThunk<IAppointment[], void>(
  "appointments/fetchAppointments",
  async (_, { getState }) => {
    const token = selectToken(getState() as RootState);
    if (!token) {
      throw new Error("Token not found");
    }

    const response = (await getAppointments(token)) as IAppointment[];
    return response; // Return the array directly
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
