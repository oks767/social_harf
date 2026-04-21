// store/slices/userSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import type { IInput, IUser } from '../../../types/types'

// Состояние слайса использует IUser
interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null
};
//передаем в dispatch
export const registerUser = createAsyncThunk<IUser, IInput>(
  'user/register',
  async (userData: IInput) => {
    const response = await axios.post('/api/users/register', userData);
    return response.data.user; // Должен вернуть IUser
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      });
  }
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;