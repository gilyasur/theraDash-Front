// src/services/appointmentsApi.ts
import axios from 'axios';

const MY_SERVER = 'http://127.0.0.1:8000/appointments/';

const getAppointments = async (token:any) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(MY_SERVER, config);

    return response.data;
  } catch (error) {
    console.error("Error in getAppointments:", error);
    throw error;
  }
};




export default getAppointments;
