import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, rem, TextInput } from '@mantine/core';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { selectFirstName, selectToken } from "../Presite/login/loginSlice";
import { fetchPatients, selectPatients, selectPatientsError, selectPatientsStatus, addPatient, Ipatient } from "./patientSlice";
import styles from "../patients/patient.module.css"
import { IconAt } from '@tabler/icons-react';
import { fetchAppointments, selectAppointments } from '../Appointment/appointmentSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { IconPencil } from '@tabler/icons-react';

export function Patient() {
  const [addPatientOpened, { open: openPatient, close: closePatient }] = useDisclosure(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [showAppointments, { open: openAppointments, close: closeAppointments }] = useDisclosure(false);
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const patients = useSelector(selectPatients);
  const status = useSelector(selectPatientsStatus);
  const error = useSelector(selectPatientsError);
  const token = useSelector(selectToken);
  const appointments = useSelector(selectAppointments);
  const filteredAppointments = appointments.filter(appointment => appointment.patient.id === selectedPatientId);

  const navigate = useNavigate();
  const [newPatientData, setNewPatientData] = useState<Ipatient>({
    id: 0,
    therapist: 1, 
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    price: "",
    day_of_week: ""
  });

  useEffect(() => {
    if (token) {
      dispatch(fetchPatients(token));
      dispatch(fetchAppointments(token));
    } else {
      navigate('/');
    }
  }, [dispatch, token]);

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  const handleAddPatient = () => {
    dispatch(addPatient({ token, patientData: newPatientData }));
    setNewPatientData({
      id: 0,
      therapist: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "", 
      address: "",
      price: "",
      day_of_week: "",
    });
    closePatient(); 
  };

  const handleOpenAppointments = (id: number) => {
    setSelectedPatientId(id);
    openAppointments();
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div>
      <Modal opened={addPatientOpened} onClose={closePatient} title="Add New Patient" centered>
      
        <div>
        <TextInput
          withAsterisk
          description="First Name"
          placeholder="Patient First Name"
          value={newPatientData.first_name}
          onChange={(e) => setNewPatientData({ ...newPatientData, first_name: e.target.value })}
        />
        <TextInput
          withAsterisk
          description="Last Name"
          placeholder="Patient Last Name"
          value={newPatientData.last_name}
          onChange={(e) => setNewPatientData({ ...newPatientData, last_name: e.target.value })}
        />
        <TextInput
          withAsterisk
          description="Address"
          placeholder="Patient Address"
          value={newPatientData.address}
          onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
        />
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={icon}
          label="Email"
          placeholder="Email"
          value={newPatientData.email}
          onChange={(e) => setNewPatientData({ ...newPatientData, email: e.target.value })} 
        />
        <TextInput
          withAsterisk
          description="Telephone Number"
          placeholder="Patient Number"
          value={newPatientData.phone_number}
          onChange={(e) => setNewPatientData({ ...newPatientData, phone_number: e.target.value })}
        />
        <span style={{color:"#868e96", fontSize:"0.8rem"}}>Patient DOB : </span>
        <br/>
        <input type="date" placeholder="Date of Birth" value={newPatientData.date_of_birth} onChange={(e) => setNewPatientData({ ...newPatientData, date_of_birth: e.target.value })} />
        <br></br>
        <button onClick={handleAddPatient} style={{paddingTop:"2px"}}>Add Patient</button>
        </div>
      </Modal>
    </div>
    <Modal opened={showAppointments} onClose={closeAppointments} title="Appointments" centered >
    {filteredAppointments.map(appointment => (
        <div key={appointment.id} className={styles.filteredAppointments}>

          {appointment.occurrence_date}

         
          {appointment.time_of_day}
        </div>
      ))}
    </Modal>
    <div className={styles.navBarPatient}>
      <Button onClick={openPatient} color="#2F4858" >Add New Patient</Button>
    </div>
    <div className={styles.patientCards}>
      {patients && patients.length > 0 ? (
        patients.map((patient, index) => (
          <div key={index} className={styles.patientCard}>
           <div style={{ textAlign: 'left' }}>
      <button style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '0' }}>
        <IconPencil />
      </button>
    </div>
            <p>
              Patient: {patient.first_name} {patient.last_name}
            </p>
            <p>Email: {patient.email}</p>
            <p>Phone Number: {patient.phone_number}</p>
            <p>Date of Birth: {patient.date_of_birth}</p>
            <p>Address: {patient.address}</p>
            <p>Price: {patient.price}</p>
            <p>Day of the week: {patient.day_of_week}</p>
            <Button onClick={() => handleOpenAppointments(patient.id)}>Show Appointments</Button>

            <hr />
          </div>
        ))
      ) : (
        <div>No appointments available</div>
      )}
    </div>
    </>
  );
}
