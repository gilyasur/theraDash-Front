// SampleAppointmentComponent.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  fetchAppointments,
  selectAppointments,
  selectAppointmentsStatus,
  selectAppointmentsError,
} from './appointmentSlice';
import { selectFirstName, selectLogged, selectToken } from '../Presite/login/loginSlice';

const Appointment: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>(); // Explicitly type dispatch

  const appointments = useSelector(selectAppointments);
  const status = useSelector(selectAppointmentsStatus);
  const error = useSelector(selectAppointmentsError);
  const userFirstName = useSelector(selectFirstName);
  const token = useSelector(selectToken);
  const logged = useSelector(selectLogged);

  const [showNotesIndex, setShowNotesIndex] = useState<number | null>(null);

  const toggleNotes = (index: number) => {
    setShowNotesIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    // Dispatch the fetchAppointments action when the component mounts
    dispatch(fetchAppointments(token));
  }, [dispatch, token]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {logged ? (
        <>
          <h1>Appointments</h1>
          {userFirstName}
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index}>
                <p>
                  Patient: {appointment.patient.first_name} {appointment.patient.last_name}
                </p>
                <p>Date of appointment: {appointment.occurrence_date}</p>
                <p>Time of Day: {appointment.time_of_day}</p>

                <button onClick={() => toggleNotes(index)}>
                  {showNotesIndex === index ? 'Hide Notes' : 'Show Notes'}
                </button>
                {showNotesIndex === index && (
                  <div>
                    <p>Notes: {appointment.notes}</p>
                  </div>
                )}
                <hr />
              </div>
            ))
          ) : (
            <div>No appointments available</div>
          )}
        </>
      ) : (
        <div>shigaonno</div>
      )}
    </div>
  );
};

export default Appointment;
