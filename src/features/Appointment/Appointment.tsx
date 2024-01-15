// SampleAppointmentComponent.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchAppointments, selectAppointments, selectAppointmentsStatus, selectAppointmentsError } from './appointmentSlice';
import { selectFirstName, selectToken } from '../login/loginSlice';
import getAppointments from './appointmentAPI ';

const Appointment: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>(); // Explicitly type dispatch

  const appointments = useSelector(selectAppointments);
  const status = useSelector(selectAppointmentsStatus);
  const error = useSelector(selectAppointmentsError);
  const userFirstName =useSelector(selectFirstName)
  const token = useSelector(selectToken)
  useEffect(() => {
    // Dispatch the fetchAppointments action when the component mounts
    dispatch(fetchAppointments());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Appointments</h1>
      {userFirstName}
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <div key={index}>
            <p>Therapist: {appointment.therapist.username}</p>
            <p>Patient: {appointment.patient.first_name} {appointment.patient.last_name}</p>
            <p>Recurring Frequency: {appointment.recurring_frequency}</p>
            <p>Day of Week: {appointment.day_of_week}</p>
            <p>Time of Day: {appointment.time_of_day}</p>
            <p>Location: {appointment.location}</p>
            <p>Notes: {appointment.notes}</p>

            <hr />
          </div>
        ))
      ) : (
        <div>No appointments available</div>
      )}
    </div>
  );
};

export default Appointment;
