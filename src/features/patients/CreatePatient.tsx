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

export function CreatePatient() {
  return (
    <div>
     "create"
      
    </div>
  );
};

