/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface SingleTargetData {
  id?: string;
  user_id?: string;
  name?: string;
  target?: string;
  frequency?: string;
  category?: string;
  startDate?: string;
  target_amount: number;
  amount_saved?: number;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  days_left?: number;
}

export interface InitialState {
  user: SingleTargetData;
  token: string;
  isAuthenticated: boolean;
  error: string;
}

const initialUserState: InitialState = {
  user: {
      target_amount: 0
  },
  token: "",
  isAuthenticated: false,
  error: "",
};

// Define an async thunk to fetch a user's single target
export const fetchUserSingleTarget = createAsyncThunk(
  "singleTarget/fetchUserSingleTarget",
  async (userId: string, thunkAPI) => {
    try {
    
      const response = await axios.get(`http://localhost:3000/savings/get_single_target/${userId}`);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        if (error.response) {
            console.log(error.response)
            return thunkAPI.rejectWithValue(error.response.data);
    }
    if (error.request) {
        return thunkAPI.rejectWithValue("Network Error");
    }
    if (error.message) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const singleTargetDataSlice = createSlice({
  name: "singleTarget",
  initialState: initialUserState,
  reducers: {
    // Action to set user data
    setUser: (state, action: PayloadAction<SingleTargetData>) => {
      state.user = action.payload;
    },

    // Action to set authentication status
    setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    // Action to set the user's token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    // Action to set an error message
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSingleTarget.fulfilled, (state, action) => {
      // Update state with the fetched target data
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserSingleTarget.rejected, (state) => {
      // Handle API call rejection here, you can also dispatch setError action
      state.error = "Error fetching user's single target";
    });
  },
});

// Export action creators
export const {
  setUser,
  setAuthenticationStatus,
  setToken,
  setError,
} = singleTargetDataSlice.actions;

// Export the reducer
export default singleTargetDataSlice.reducer;
