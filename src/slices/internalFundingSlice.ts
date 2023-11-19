import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/httpService";
import { toast } from "react-toastify";

export interface Payload {
    amount: string
}

export interface TransactiontDetail {
    id?: string;
    source_wallet_id?: string;
    destination_wallet_id?: string;
    owner_id?: string;
    amount?: number;
    status?: string;
    action?: string;
    type?: string;
    created_at?: Date;
}

export interface InternalTransfer {
  transaction: TransactiontDetail;
  error: string;
}

const initialState: InternalTransfer = {
  transaction: {},
  error: "",
};

export const withdrawFromGroup = createAsyncThunk(
  "withdraw from group",
  async (payload: Payload, thunkAPI) => {
    try {
      const response = await axios.post("/users/groupwithdraw", payload);

      return response.data;

      // console.log(response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
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


export const withdrawFromSavings = createAsyncThunk(
  "withdraw from savings",
  async (payload: Payload, thunkAPI) => {
    try {
      const response = await axios.post("/users/savingswithdraw", payload);

      return response.data;

      // console.log(response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
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




export const InternalFundingSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
  },


  extraReducers: (builder) => {
    builder.addCase(withdrawFromGroup.pending, (state) => {
      state.error = "";
    });

    builder.addCase(withdrawFromGroup.fulfilled, (state, action) => {
       state.transaction = action.payload.data;
       toast(action.payload.message);
    // localStorage.setItem("reference", action.payload.data);
      state.error = "";
      console.log(action.payload.data.internalWithdrawal);
      state.transaction = action.payload.data.internalWithdrawal
       
    });

    builder.addCase(withdrawFromGroup.rejected, (state, action) => {
      
       state.error = action.payload as string;
       toast.error(state.error);
       console.log(state.error) 
    });


    builder.addCase(withdrawFromSavings.pending, (state) => {
      state.error = "";
    });

    builder.addCase(withdrawFromSavings.fulfilled, (state, action) => {
       state.transaction = action.payload.data;
       toast(action.payload.message);
    // localStorage.setItem("reference", action.payload.data);
      state.error = "";
      console.log(action.payload.data.internalWithdrawal);
      state.transaction = action.payload.data.internalWithdrawal
       
    });

    builder.addCase(withdrawFromSavings.rejected, (state, action) => {
      
       state.error = action.payload as string;
       toast.error(state.error);
       console.log(state.error) 
    });


  },



});

// Action creators are generated for each case reducer function


export default InternalFundingSlice.reducer;
