/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/httpService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


interface ContributionPayload {
  [key: number]: string;
}

interface Transaction {
  id?:  string;
  wallet_id?: string;
  owner_id?: string;
  amount?: number;
  status?: string;
  action?: string;
  type?: string;
  created_at?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface InitialState {
  transaction: Transaction;
  is_Loading: boolean;
  error: string;
}

const initialState:InitialState = {
  transaction:{},
  is_Loading: false,
  error: "",
};



export const contributeToGroup = createAsyncThunk(
  'contribution/contributeToGroup',

  async (  payload: ContributionPayload, thunkAPI) => {
    
    try {
    //  const groupId = localStorage.getItem('groupId');
    const groupId = useParams()

      if (!groupId) {
        return thunkAPI.rejectWithValue('Group ID is undefined. Please try again later or contact support.');
      }
      
      const response = await axios.post(`/group/contribute/${groupId}`, payload);
    
     
      return response.data;
    }  catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else if (error.request) {
        return thunkAPI.rejectWithValue('Network Error');
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const contributionSlice = createSlice({
  name: 'contribution',

  
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contributeToGroup.pending, (state) => {
        state.is_Loading = true;
        state.error = '';
    
      })
      .addCase(contributeToGroup.fulfilled, (state, action) => {
        state.is_Loading = false;
        state.transaction = action.payload.Transaction_receipt;
        toast(action.payload.message)
      })
      .addCase(contributeToGroup.rejected, (state, action) => {
        state.is_Loading = false;
        state.error = action.payload as string;
        toast(action.payload as string)
      });
  },
});

export default contributionSlice.reducer;















