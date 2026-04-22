// store/slices/AuthSlice/register_slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface RegisterState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: RegisterState = {
    isLoading: false,
    error: null,
    success: false,
};

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData: { name: string; email: string; password: string }) => {
        const response = await axios.post('http://localhost:3001/api/v1/register', userData);
        return response.data;
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        resetRegister: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Registration failed';
                state.success = false;
            });
    },
});

export const { clearError, clearSuccess, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;