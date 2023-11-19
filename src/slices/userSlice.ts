import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";

export interface UserDetails {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePic?: string;
    password?: string;
    role?: string;
    phone?: string;
    created_at?: Date;
    gender?: string;
    occupation?: string;
    date_of_birth?: string;
    bvn?: number;
    address?: string;
    identification_number?: string;
    identification_doc?: string;
    proof_of_address_doc?: string;
}

export interface InitialUserState {
    user: UserDetails;
    token: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string;
    message: string;
}

const initialState: InitialUserState = {
    user: {},
    token: "",
    isAuthenticated: false,
    isLoading: false,
    error: "",
    message: ""
};

export const userLogin = createAsyncThunk(
    "userAuth/loginUser",
    async (payload: Record<string, string>, thunkAPI) => {
        try {
            const response = await axios.post("/users/login", payload);

            localStorage.setItem("user", JSON.stringify(response.data.confirmUser));
            localStorage.setItem("token", JSON.stringify(response.data.token));
           

            // console.log("response", response.data.token)
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

export const userKYC = createAsyncThunk(
    "usersKYC/updateUser",
    async (payload: FormData, thunkAPI) => {
        try {
            const response = await axios.patch("/users/updateUser", payload);

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

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {};
            state.isAuthenticated = false;
            state.token = "";
            window.location.href = "/";
            localStorage.clear();
        
        },
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            // Add vendor to the state array
            state.isAuthenticated = false;
            state.error = "";
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            // Add vendor to the state array
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            toast(action.payload.message);
            state.error = "";
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            // Add vendor to the state array
            state.isAuthenticated = false;
            state.error = action.payload as string;
        });

        // KYC page info
        builder.addCase(userKYC.pending, (state) => {
            // Add vendor to the state array
            state.isLoading = true;
            // state.isAuthenticated = false;
            state.error = "";
        });
        builder.addCase(userKYC.fulfilled, (state, action) => {
            // Add vendor to the state array
            // state.isAuthenticated = true;
            state.user = action.payload.data;
            state.message = action.payload.message;
            // localStorage.setItem("token", action.payload.token);
            toast(action.payload.message);
            state.error = "";
            state.isLoading = false;
        });
        builder.addCase(userKYC.rejected, (state, action) => {
            // Add vendor to the state array
            state.isLoading = false;
            state.message = "";
            // state.isAuthenticated = false;
            state.error = action.payload as string;
        });
    },
});

// Action creators are generated for each case reducer function
export const { logout, loginSuccess } = userAuthSlice.actions;

export default userAuthSlice.reducer;