import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/httpService";
import { toast } from "react-toastify";


interface ActionPayload {
  message: string;
  settingToUpdate: keyof SettingsDetail;
}



export interface SettingsDetail {
  // [x: string]: any;
  id: string;
  owner_id: string;
  email_notification: boolean;
  contribution_reminder: boolean;
  group_join_request: boolean;
  two_factor_authentication: boolean;
  password_update: boolean;
  profile_visibility: boolean;
  email_privacy: boolean;
  savings_group_update: boolean;
  personal_saving_alert: boolean;
  deactivate_account: boolean;
}

export interface InitialState {
  userSettings: SettingsDetail;
  token: string;
  isAuthenticated: boolean;
  error: string;

  message: string;
}
const initialState: InitialState = {
  userSettings: {
    id: "",
    owner_id: "",
    email_notification: true,
    contribution_reminder: true,
    group_join_request: true,
    two_factor_authentication: true,
    password_update: false,
    profile_visibility: true,
    email_privacy: false,
    savings_group_update: false,
    personal_saving_alert: true,
    deactivate_account: false,
  },
  token: "",
  isAuthenticated: false,
  error: "",
  message: "",
};

export const getUserSetting = createAsyncThunk(
  "setting/getSettings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/setting/userSettings");

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

export const updateUserSetting = createAsyncThunk(
  "setting/UpdatedSettings",
  async (payload:keyof SettingsDetail, thunkAPI) => {
    try {
      
      const response = await axios.put("/setting/toggle", {settingName: payload});

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue({ message :error.response.data.message, settingToUpdate:payload});
      }
      if (error.request) {
        return thunkAPI.rejectWithValue({ message: "Network Error", settingToUpdate:payload});
      }
      if (error.message) {
        return thunkAPI.rejectWithValue({message : error.message, settingToUpdate:payload});
      }
    }
  }
);

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateSetting: (state, action: PayloadAction < keyof SettingsDetail>) => {
      state.userSettings = { ...state.userSettings, [action.payload]: !state.userSettings[action.payload] };
    }

  },
  extraReducers: (builder) => {
    // ... (Existing code)

    builder.addCase(getUserSetting.pending, (state) => {
      // state.isAuthenticated = false;
      state.message = "";
      state.error = "";
    });

    builder.addCase(getUserSetting.fulfilled, (state, action) => {
      state.userSettings = action.payload.data;
      state.message = action.payload.message;
      //   state.isAuthenticated = true;
      state.error = "";
    });

    builder.addCase(getUserSetting.rejected, (state, action) => {
      state.message = "";
      // state.isAuthenticated = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateUserSetting.pending, (state) => {
     
      state.message = "";
      state.error = "";
    });

    builder.addCase(updateUserSetting.fulfilled, (state, action) => {     
      state.message = action.payload.message;  
      state.error = "";
    });

    builder.addCase(updateUserSetting.rejected, (state, action) => {
      state.message = "";
      
      state.error = (action.payload as ActionPayload).message || ''; // Type assertion
       
      // Toggle the specified setting
      const settingToUpdate = (action.payload as ActionPayload).settingToUpdate; // Type assertion
      if (settingToUpdate in state.userSettings) {
        state.userSettings = {
          ...state.userSettings,
          [settingToUpdate]: !state.userSettings[settingToUpdate],
        };
      }
      toast.error((action.payload as ActionPayload).message)
    });
   
  },
});
export const { updateSetting } = settingSlice.actions;
export default settingSlice.reducer;
