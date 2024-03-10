import axios, { AxiosError, AxiosResponse } from 'axios';
export function login(credentials: { username: string; password: string }) {

    
    let MY_SERVER ="http://127.0.0.1:8000/login/"
  return axios.post(MY_SERVER,credentials)
}

export function forgotPassAPI(credentials: {username: string}) {
    let MY_SERVER = "http://127.0.0.1:8000/sendResetEmail/"
  return axios.post(MY_SERVER, credentials)
}


interface ResetPasswordResponse {
  // Define the expected response structure here
  success: boolean;
  message: string;
  // Add any other relevant properties
}


export async function resetPassAPI(credentials: { username: string; id: number; new_password: string }): Promise<AxiosResponse<ResetPasswordResponse>> {
  const MY_SERVER = 'http://127.0.0.1:8000/reset-password'; // Update the endpoint if necessary
  const config = {
    // Add any additional configuration options for the Axios request if needed
  };

  try {
    const response = await axios.patch(`${MY_SERVER}/${credentials.id}/`, credentials, config);
    console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error in Reset Password:', error);

    // Check if the error is an AxiosError and log the response data if available
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      console.error('Response Data:', responseData);
    }

    throw error; // Re-throw the error to propagate it to the caller
  }
}