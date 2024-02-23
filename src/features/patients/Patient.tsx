import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, rem, TextInput, Input } from '@mantine/core';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { selectFirstName, selectToken } from "../Presite/login/loginSlice";
import { fetchPatients, selectPatients, selectPatientsError, selectPatientsStatus, addPatient, Ipatient,  updatePatient } from "./patientSlice";
import styles from "../patients/patient.module.css"
import { IconAt } from '@tabler/icons-react';
import { fetchAppointments, selectAppointments } from '../Appointment/appointmentSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { IconPencil } from '@tabler/icons-react';

export function Patient() {
  const [addPatientOpened, { open: openPatient, close: closePatient }] = useDisclosure(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Ipatient | null>(null); 
  const [showAppointments, { open: openAppointments, close: closeAppointments }] = useDisclosure(false);
  const [editPatient, { open: openeditPatient, close: closeeditPatient }] = useDisclosure(false);
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const patients = useSelector(selectPatients);
  const status = useSelector(selectPatientsStatus);
  const error = useSelector(selectPatientsError);
  const token = useSelector(selectToken);
  const appointments = useSelector(selectAppointments);
  const filteredAppointments = appointments.filter(appointment => appointment.patient.id === selectedPatientId);

  useEffect(() => {
    if (token) {
      dispatch(fetchPatients(token));
      dispatch(fetchAppointments(token));
    } else {
      navigate('/');
    }
  }, [dispatch, token]);

  const navigate = useNavigate();
  const [newPatientData, setNewPatientData] = useState<Ipatient>({
    id: 0,
    therapist: 2, 
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    price: "10",
    day_of_week: ""
  });
  const [editPatientData, seteditPatientData] = useState<Ipatient>({
    id: selectedPatient?.id || 0,
    therapist: selectedPatient?.therapist || 1, 
    first_name: selectedPatient?.first_name || "",
    last_name: selectedPatient?.last_name || "",
    email: selectedPatient?.email || "",
    phone_number: selectedPatient?.phone_number || "",
    date_of_birth: selectedPatient?.date_of_birth || "",
    address: selectedPatient?.address || "",
    price: selectedPatient?.price || "",
    day_of_week: selectedPatient?.day_of_week || ""
  });

 

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
  const handleOpenEditPatient = (patient: Ipatient) => {
    setSelectedPatient(patient);
    seteditPatientData({ ...patient }); // Set editPatientData to the selected patient's data
    openeditPatient();    
  };
  const handleEditPatient = () => {
    if (!selectedPatient) {
      // Handle the case where selectedPatient is null, maybe show an error message or return early
      return;
    }
    
    // Create a copy of the editPatientData and update only the fields that have been changed
    const updatedPatientData = {
      ...selectedPatient, // Use selectedPatient's data as a base
      ...editPatientData 
    };
  
    // Dispatch action to update patient data
    dispatch(updatePatient({ token, patientData: updatedPatientData }));

    // Close the edit modal
    closeeditPatient(); 
    
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
      {appointment.occurrence_date} {/* Format the date */}
    </div>
  ))}
</Modal>


    <div className={styles.navBarPatient}>
      <Button onClick={openPatient} color="#2F4858" >Add New Patient</Button>
    </div>
    <Modal opened={editPatient} onClose={closeeditPatient} withCloseButton={false}>
  <div>
    {/* Check if selectedPatient exists before rendering */}
    {selectedPatient && (
      <>
        <TextInput
          label="First Name"
          placeholder={selectedPatient.first_name}
          value={editPatientData.first_name}
          onChange={(e) => seteditPatientData({ ...editPatientData, first_name: e.target.value })} 
        />
        <TextInput
          label="Last Name"
          placeholder={selectedPatient.last_name}
          value={editPatientData.last_name}
          onChange={(e) => seteditPatientData({ ...editPatientData, last_name: e.target.value })} 
        />
        {/* Add similar TextInput components for other fields */}
        <Button onClick={handleEditPatient}>Save Changes</Button>
      </>
    )}
  </div>
</Modal>

    <div className={styles.patientCards}>
      {patients && patients.length > 0 ? (
        patients.map((patient, index) => (
          <div key={index} className={styles.patientCard}>
           <div style={{ textAlign: 'left' }}>
           <Button
  style={{ border: 'none', background: '#F5EEE6', color:"#2F4858", cursor: 'pointer', marginLeft: '0' }}
  onClick={() => handleOpenEditPatient(patient)}
>
  <IconPencil />
</Button>

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
