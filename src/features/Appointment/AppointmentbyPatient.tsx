// SampleAppointmentComponent.tsx
import { Table } from '@mantine/core';
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
  
  
  const ths = (
    <Table.Tr>
        Patient Name	Date of Appointment	Time of Day	Notes	Action
      <Table.Th>Patient Name</Table.Th>
      <Table.Th>Date of Appointment	</Table.Th>
      <Table.Th>Time of Day</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  return (
     
    <div>
      return (
    <Table striped highlightOnHover withTableBorder withColumnBorders withRowBorders={false} stickyHeader stickyHeaderOffset={60}>
    <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>

    </Table>
  );
    </div>
  );
};

export default Appointment;
