/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/";
import axios from "../api/httpService";

interface ActivitiesState {
  limitedContributions: any;
  contributions: Contribution[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const ActivitiesState = {
  contributions: [],
  limitedContributions: [], // Add this field
  loading: "idle",
  error: null,
};

interface Contribution {
  groupName: string;
  contributionAmount: number;
  date: any;
  image: any;
}

export const fetchUserUpcomingActivities = createAsyncThunk(
  "activities/fetchUserUpcomingActivities",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/users/get-user-upcoming-activities`);
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("Network Error");
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

// Create the activities slice
const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    contributions: [],
    limitedContributions: [], // Add this field
    loading: "idle",
    error: null,
  } as ActivitiesState,
  reducers: {
    setLimitedContributions: (state) => {
      state.limitedContributions = state.contributions.slice(0, 4);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserUpcomingActivities.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserUpcomingActivities.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.contributions = action.payload.contributions;
        state.error = null;
        state.limitedContributions = state.contributions.slice(0, 4);
      })
      .addCase(fetchUserUpcomingActivities.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message as string;
      });
  },
});

// Export the reducer and any actions you may have defined
export default activitiesSlice.reducer;
export const selectLimitedContributions = (state: RootState) =>
  state.activities.limitedContributions;

// Define selectors for accessing the state
export const selectContributions = (state: RootState) =>
  state.activities.contributions;
export const selectLoading = (state: RootState) => state.activities.loading;
export const selectError = (state: RootState) => state.activities.error;
