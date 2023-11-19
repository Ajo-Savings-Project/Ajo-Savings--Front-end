// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { toast } from "react-toastify";
import axios from "../api/httpService";

interface GroupTransactions {
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
export interface CreateGroupsAttributes {
  id: string;
  title: string; //group name
  description: string; //purpose and goals
  admin_id: string;
  group_image?: string;
  contribution_amount: number; //contribution amount

  group_transactions: GroupTransactions[];
  amount_withdrawn: number;
  members: Members[];
  number_of_participants: number; //number of participants
  frequency: string; //ft
  startDate: Date; //start date
  endDate: Date; //end date
  created_at: Date;
}



export interface InitialState {
  Group: CreateGroupsAttributes [];
  isLoading: boolean;
//   token: string;
//   isAuthenticated: boolean;
  error: string;
  message: string;
}
const initialState: InitialState = {
  Group: [],
  isLoading: false,
//   token: "",
//   isAuthenticated: false,
  error: "",
  message: "",
};

export const createGroup = createAsyncThunk(
    "groups/create-Group",
    async (payload: Record<string,string>, thunkAPI) => {
      try {
        const response = await axios.post("/groups/create-group", payload);
        // localStorage.setItem("userId", JSON.stringify(response.data.id))
        return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
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
  
  export const getSingleGroup = createAsyncThunk(
    "groups/get-One-Group",
    async (_, thunkAPI) => {
      try {
        //const user = (localStorage.getItem('user'))
        ///const id = user.id
        const response = await axios.get("/groups/getsinglegroup");
        // localStorage.setItem("userId", JSON.stringify(response.data.id))
        return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
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

  export const createGroupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        createGroupSuccess: (state, action) => {state.Group = action.payload.data}
    },
    extraReducers: (builder) => {
      // ... (Existing code)
  
      builder.addCase(createGroup.pending, (state) => {
        state.isLoading = true;
        // state.isAuthenticated = false;
        state.message = "";
        state.error = "";
      });
  
      builder.addCase(createGroup.fulfilled, (state, action) => {
        state.message = action.payload.message;        
        // state.isAuthenticated = true;
        state.error = "";
      });
  
      builder.addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        // state.isAuthenticated = false;
        state.error = action.payload as string;
      });

      builder.addCase(getSingleGroup.pending, (state) => {
        state.isLoading = true;
        // state.isAuthenticated = false;
        state.message = "";
        state.error = "";
      });
  
      builder.addCase(getSingleGroup.fulfilled, (state, action) => {
         // Add user to the state array
      state.Group = action.payload.data;
      state.message = action.payload.message;
      state.error = "";
      // toast.success(action.payload.message);
      });
  
      builder.addCase(getSingleGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        // state.isAuthenticated = false;
        state.error = action.payload as string;
      });
    },

    
  });

  // Action creators are generated for each case reducer function
  export const {createGroupSuccess } = createGroupSlice.actions;

export default createGroupSlice.reducer;