import axios from "axios";
import { log } from "console";
const MY_SERVER ="http://127.0.0.1:8000/patients/"






const getPatient = async (token: any) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(MY_SERVER, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const createPatient = async (token: any, patientData: any) => {
  console.log('Creating a new patient...');
  console.log('Patient Data:', patientData); // Log the patient data for debugging

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(MY_SERVER, patientData, config);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createPatient:', error);

    // Check if the error is an AxiosError and log the response data if available
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      console.error('Response Data:', responseData);
    }

    throw error; // Re-throw the error to propagate it to the caller
  }
};
let tempPatient =  {
  "id": 7,
  "first_name": "roni",
  "last_name": "Doe",
  "email": "Yoo@gmail.com",
  "phone_number": "0506948488",
  "date_of_birth": "2024-02-07",
  "address": "tel aviv",
  "created_at": "2024-02-09T19:05:48.194250Z",
  "updated_at": "2024-02-17T18:16:28.317375Z",
  "day_of_week": null,
  "recurring_frequency": "Weekly",
  "canceled": false,
  "cancellation_reason": null,
  "price": null,
  "therapist": 2
}
const updatePaitentAPI = async (token: any, patientData: any) => {
  console.log(patientData.id);
  
  console.log('Patient Data:', patientData); // Log the patient data for debugging

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.patch(`${MY_SERVER}${patientData.id}/`, patientData, config);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in Update patient:', error);

    // Check if the error is an AxiosError and log the response data if available
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      console.error('Response Data:', responseData);
    }

    throw error; // Re-throw the error to propagate it to the caller
  }
};

export { getPatient, createPatient, updatePaitentAPI };