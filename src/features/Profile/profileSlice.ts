import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getProfile } from './profileAPI';

export interface IProfile {
  image: string;
  title: string;
  id: number;
  address:string;
  dob:any;
  user_id:any;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

export interface IProfileState {
  profile: IProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IProfileState = {
  profile: [],
  status: 'idle',
  error: null,
};

export const fetchProfile = createAsyncThunk<IProfile[], { token: string; userID: number }>(
  'profiles/fetchProfile',
  async ({ token, userID }) => {
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await getProfile(token, userID);
      return response;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      throw error;
    }
  }
);



const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProfile.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.profile = action.payload; // Assuming action.payload is an array of profiles
          
        })
        .addCase(fetchProfile.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error && action.error.message ? action.error.message : 'Unknown error'; // Assign a default error message if action.error is undefined or its message is undefined
        })
        
    },
  });

  export const selectProfile = (state: RootState) => state.profile;

  
export default profileSlice.reducer;
