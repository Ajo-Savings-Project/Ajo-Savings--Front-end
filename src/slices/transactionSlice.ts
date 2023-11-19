import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/httpService";

export interface TransactionDetails {
  wallet_id: string;
  reciever: string;
  type: string;
  created_at: Date;
  amount: number;
}

export interface InitialTransactionState {
  transactions: TransactionDetails[];
  error: string;
}

const initialState: InitialTransactionState = {
  transactions: [],
  error: "",
};

export const getTransactionInfo = createAsyncThunk(
  "transaction/getTransction",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users/get-user-transactions");

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      if (error.request) {
        return thunkAPI.rejectWithValue("Network Error");
      }
      if (error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const transactionSlice = createSlice({
  name: "target",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactionInfo.pending, (state) => {
      state.error = "";
    });
    builder.addCase(getTransactionInfo.fulfilled, (state, action) => {
      // state.isAuthenticated = true;
      state.transactions = action.payload.data;
      state.error = "";
    });
    builder.addCase(getTransactionInfo.rejected, (state, action) => {
      // Add vendor to the state array
      // state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

export default transactionSlice.reducer;
