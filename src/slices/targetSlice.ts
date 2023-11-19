import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios from "../api/httpService";
import { toast } from "react-toastify";

export interface TargetDetails {
    id: string;
    user_id: string;
    name: string;
    target: string;
    target_amount: number;
    amount_saved: number;
    frequency: string;
    category: string;
    startDate: string;
    endDate: string;
    created_at: Date;
}

export interface InitialTargetState {
    targets: TargetDetails[];
    // token: string;
    // isAuthenticated: boolean;
    error: string;
}

const initialState: InitialTargetState = {
    targets: [],
    // token: "",
    // isAuthenticated: false,
    error: "",
};

export const getTargetInfo = createAsyncThunk(
    "targets/getTarget",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/savings/get_all_user_target");

            // localStorage.getItem(response.data.id );
            // console.log("response", response.data.token)
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
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
    }
);

export const createTarget = createAsyncThunk(
    "createTarget/user",
    async (payload: Record<string, string>, thunkAPI) => {
        try {
            const response = await axios.post("/savings/create", payload);

            // localStorage.setItem("user", JSON.stringify(response.data.confirmUser));
            // localStorage.setItem("token", JSON.stringify(response.data.token));
            // console.log("response", response.data.token)
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
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
    }
);
export const targetSlice = createSlice({
    name: "target",
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.user = {};
        //     state.isAuthenticated = false;
        //     state.token = "";
        //     window.location.href = "/";
        //     localStorage.clear();
        // },
        // loginSuccess: (state, action) => {
        //     state.user = action.payload.user;
        //     state.token = action.payload.token;
        //     state.isAuthenticated = true;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getTargetInfo.pending, (state) => {
            // Add vendor to the state array
            // state.isAuthenticated = false;
            state.error = "";
        });
        builder.addCase(getTargetInfo.fulfilled, (state, action) => {
            // Add vendor to the state array
            // state.isAuthenticated = true;
            state.targets = action.payload.data;
            // state.token = action.payload.token;
            // localStorage.setItem("token", action.payload.token);
            // toast(action.payload.message);
            state.error = "";
        });
        builder.addCase(getTargetInfo.rejected, (state, action) => {
            // Add vendor to the state array
            // state.isAuthenticated = false;
            state.error = action.payload as string;
        });
        builder.addCase(createTarget.pending, (state) => {
            // state.isAuthenticated = false;
            state.error = "";
        });
        builder.addCase(createTarget.fulfilled, (state, action) => {
            // state.isAuthenticated = true;
            state.targets.unshift(action.payload.data);
            // state.token = action.payload.token;
            // localStorage.setItem("token", action.payload.token);
            toast(action.payload.message);
            state.error = "";
        });
        builder.addCase(createTarget.rejected, (state, action) => {
            // state.isAuthenticated = false;
            state.error = action.payload as string;
        });
    },
});


export default targetSlice.reducer;