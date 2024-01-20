import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/Presite/login/loginSlice';

import appointmentReducer from '../features/Appointment/appointmentSlice';
import patientReducer from '../features/patients/patientSlice';

export const store = configureStore({
  
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    appointment: appointmentReducer,
    patient:patientReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
