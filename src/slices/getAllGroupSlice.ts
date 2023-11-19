// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { toast } from "react-toastify";
import axios from "../api/httpService";

interface Group_transactions {
    transaction_id: string;
    date_initiated: Date;
    contributors_id: string;
    amount: number
    transaction_type: string 
}
interface Members {
    member_id: string;
    name: string;
    amount_contributed: number;
    amount_withdrawn: number;
  }
export interface AllGroupsAttributes {
    id: string;
    title: string; //group name
    description: string; //purpose and goals
    admin_id: string;
    group_image: string;
    contribution_amount: number; //contribution amount
    amount_contributed: number;
    group_transactions:  Group_transactions 
    amount_withdrawn: number;
    members: Members[]
    number_of_participants: number; //number of participants
    frequency: string; //ft
    startDate: Date; //start date
    endDate: Date; //end date
    created_at: Date;
}


export interface InitialState {
  allGroups: AllGroupsAttributes [];
  isLoading: boolean;
  token: string;
  isAuthenticated: boolean;
  error: string;
  message: string;
}
const initialState: InitialState = {
    allGroups: [],
  isLoading: false,
  token: "",
  isAuthenticated: false,
  error: "",
  message: "",
};

export const getAllGroups = createAsyncThunk(
  "allGroups/getAllGroup",
  async (_, thunkAPI) => {

    try {
      const response = await axios.get("/groups/get-groups");
    
     
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
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

export const getAllGroupSlice = createSlice({
  name: "allGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( getAllGroups.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.isAuthenticated = false;
      state.message = "";
      state.error = "";
    });
    builder.addCase( getAllGroups.fulfilled, (state, action) => {
      // Add user to the state array
      state.allGroups = action.payload.data;
      state.message = action.payload.message;
      state.token = action.payload.message;
      state.isAuthenticated = true;
      state.error = "";
      // toast.success(action.payload.message);
    });

    builder.addCase( getAllGroups.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.message = "";
      state.isAuthenticated = false;
      state.error = action.payload as string;
      // toast.error(action.payload as string);
    });
  },
});

// Action creators are generated for each case reducer function
//   export const { logout, loginSuccess } = popularFoodSlice.actions;

export default getAllGroupSlice.reducer;