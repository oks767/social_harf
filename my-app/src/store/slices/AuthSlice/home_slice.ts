// store/slices/AuthSlice/register_slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
interface UserData {
    id?: string;
    name: string;
    email: string;
    role: string;
    message?: string;
}
interface RegisterState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
		 userData: UserData | null; 
}

const initialState: RegisterState = {
    isLoading: false,
    error: null,
    success: false,
		userData: null,
};

export const getHomeUser = createAsyncThunk(
    'home/getHomeUser',
    async (userData: {email: string; name: string, role: string }) => {
        const response = await axios.get('http://localhost:3001/api/v1/home', {params:userData});
        return response.data;
    }
);

const homeSlice = createSlice({
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
            state.userData = null;  // ✅ Очищаем данные
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomeUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
                state.userData = null;  // ✅ Очищаем старые данные
            })
            .addCase(getHomeUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.error = null;
                state.userData = action.payload;  // ✅ СОХРАНЯЕМ данные из ответа
            })
            .addCase(getHomeUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to load data';
                state.success = false;
                state.userData = null;
            });
    },
});

export const { clearError, clearSuccess, resetRegister } = homeSlice.actions;
export default homeSlice.reducer;

