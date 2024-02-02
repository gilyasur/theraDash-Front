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
import { IAppointment } from './appointmentSlice';
import { Table } from '@mantine/core';


interface IPatient {
  id: number;
  first_name: string;
  last_name: string;
}

const Appointment: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>(); // Explicitly type dispatch

  const appointments = useSelector(selectAppointments);
  const status = useSelector(selectAppointmentsStatus);
  const error = useSelector(selectAppointmentsError);
  const userFirstName = useSelector(selectFirstName);
  const token = useSelector(selectToken);
  const logged = useSelector(selectLogged);

  const [showNotesIndex, setShowNotesIndex] = useState<number | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const toggleNotes = (index: number) => {
    setShowNotesIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatientId(Number(event.target.value));
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

  // Extract unique patients for the dropdown
  const uniquePatients: IPatient[] = Array.from(new Set(appointments.map(appointment => appointment.patient.id)))
    .map(patientId => appointments.find(appointment => appointment.patient.id === patientId)?.patient)
    .filter(Boolean) as IPatient[];

  // Filter appointments based on the selected patient
  const filteredAppointments = selectedPatientId
    ? appointments.filter(appointment => appointment.patient.id === selectedPatientId)
    : appointments;

  // Sort the filteredAppointments by date
  const sortedAppointments = filteredAppointments.slice().sort((a: IAppointment, b: IAppointment) => {
    const dateA = new Date(a.occurrence_date);
    const dateB = new Date(b.occurrence_date);
    return dateA.getTime() - dateB.getTime();
  });

  const ths = (
    <Table.Tr>
      <Table.Th>Patient Name</Table.Th>
      <Table.Th>Date of Appointment</Table.Th>
      <Table.Th>Time of Day</Table.Th>
      <Table.Th>Notes</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const rows = sortedAppointments.map((appointment: IAppointment, index: number) => (
    <Table.Tr key={index}>
      <Table.Td style={{ textAlign: 'left' }}>{appointment.patient.first_name} {appointment.patient.last_name}</Table.Td>
      <Table.Td style={{ textAlign: 'left' }}>{appointment.occurrence_date}</Table.Td>
      <Table.Td style={{ textAlign: 'left' }}>{appointment.time_of_day}</Table.Td>
      <Table.Td style={{ textAlign: 'left' }}>{appointment.notes}</Table.Td>
      <Table.Td style={{ textAlign: 'left' }}>
        <button onClick={() => toggleNotes(index)}>
          {showNotesIndex === index ? 'Hide Notes' : 'Show Notes'}
        </button>
        {showNotesIndex === index && (
          <div>
            <p>Notes: {appointment.notes}</p>
          </div>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      {logged ? (
        <>
          <h1>Appointments</h1>

          {/* Select dropdown for filtering by patient */}
          <label htmlFor="patientSelect">Filter by Patient:</label>
          <select id="patientSelect" onChange={handlePatientChange}>
            <option value="">All Patients</option>
            {uniquePatients.map((patient, index) => (
              <option key={index} value={patient.id}>
                {patient.first_name} {patient.last_name}
              </option>
            ))}
          </select>

          {sortedAppointments && sortedAppointments.length > 0 ? (
            <Table striped highlightOnHover withTableBorder withColumnBorders withRowBorders={false} stickyHeader stickyHeaderOffset={60}>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
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
