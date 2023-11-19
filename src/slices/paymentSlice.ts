import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/httpService";
export interface PaymentDetail {
  amount?: number | null | string;
  email?: string;
}

export interface InitialPaymentState {
  data: PaymentDetail[];

  error: string;
}
const initialState: InitialPaymentState = {
  data: [],

  error: "",
};

export const initiatePayment = createAsyncThunk(
  "payment/makePayment",
  async (payload: PaymentDetail, thunkAPI) => {
    try {
      const response = await axios.post("/paystack/pay", payload);

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

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentSuccess: (state, action) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initiatePayment.pending, (state) => {
      // Add vendor to the state array

      state.error = "";
    });
    builder.addCase(initiatePayment.fulfilled, (state, action) => {
      // Add vendor to the state array
      // state.isAuthenticated = true;
    //   state.data = action.payload.data;

    //   localStorage.setItem("reference", action.payload.data.reference);
      // toast(action.payload.message);
      state.error = "";
      console.log(action.payload);
      window.location.href = action.payload.url;
      state.data = []
      
    });
    builder.addCase(initiatePayment.rejected, (state, action) => {
      // Add vendor to the state array
      // state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

// Action creators are generated for each case reducer function
export const { paymentSuccess } = paymentSlice.actions;

export default paymentSlice.reducer;
