// src/services/appointmentsApi.ts
import axios from 'axios';

const MY_SERVER = 'http://127.0.0.1:8000/appointments/';

const getAppointments = async (token:any) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(MY_SERVER, config);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error in getAppointments:", error);
    throw error;
  }
};


const createAppointmentAPI = async (token: any, appointmentData: any) => {
  console.log('Creating a new appointment...');
  console.log('appointment Data:', appointmentData); // Log the patient data for debugging

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(MY_SERVER, appointmentData, config);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createAppointment:', error);

    // Check if the error is an AxiosError and log the response data if available
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      console.error('Response Data:', responseData);
    }

    throw error; // Re-throw the error to propagate it to the caller
  }
};

export { getAppointments, createAppointmentAPI};
