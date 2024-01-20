import axios from "axios";
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
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(MY_SERVER, patientData, config);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createPatient:', error);
    throw error;
  }
};

export { getPatient, createPatient };