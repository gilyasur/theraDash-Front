import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { selectFirstName, selectToken } from "../Presite/login/loginSlice";
import {
    fetchPatients,
  selectPatients,
  selectPatientsError,
  selectPatientsStatus,
} from "./patientSlice";

export function Patient() {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>(); // Explicitly type dispatch
  const patients = useSelector(selectPatients);
  const status = useSelector(selectPatientsStatus);
  const error = useSelector(selectPatientsError);
  const userFirstName = useSelector(selectFirstName);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchPatients(token));
    } else {
      console.error('Token not available');
    }
  }, [dispatch, token]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Patients</h1>
      {userFirstName}
      {patients && patients.length > 0 ? (
        patients.map((patient, index) => (
          <div key={index}>

            <p>Patient: {patient.first_name} {patient.last_name}</p>

            <hr />
          </div>
        ))
      ) : (
        <div>No appointments available</div>
      )}
      
    </div>
  );
};

