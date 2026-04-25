// store/slices/AuthSlice/register_slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface RegisterState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    userData: any;
}

const initialState: RegisterState = {
    isLoading: false,
    error: null,
    success: false,
    userData: null,
};

// ✅ Регистрация
export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData: any) => {
        const response = await axios.post('http://localhost:3001/api/v1/register', userData);
        return response.data;
    }
);

// ✅ Обновление роли - ЭКСПОРТИРУЕМ
export const updateUserRole = createAsyncThunk(
    'user/updateRole',
    async (roleData: { email: string; role: string }) => {
        const response = await axios.post('http://localhost:3001/api/v1/update-role', roleData);
        return response.data;
    }
);

// ✅ Получение данных
export const getHomeUser = createAsyncThunk(
    'home/getHomeUser',
    async (userData: any) => {
        const response = await axios.get('http://localhost:3001/api/v1/home', { params: userData });
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
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Регистрация
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Registration failed';
            })
            // Обновление роли
            .addCase(updateUserRole.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to update role';
            })
            // Get home user
            .addCase(getHomeUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHomeUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
            })
            .addCase(getHomeUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed';
            });
    },
});

export const { clearError, clearSuccess, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;