import axios from "axios";
import { log } from "console";
const MY_SERVER ="http://127.0.0.1:8000/patients/"






const getPatient = async (token: any) => {
  console.log('Fetching patients...');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(MY_SERVER, config);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getPatient:', error);
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


export { getPatient, createPatient };