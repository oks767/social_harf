// store/slices/AuthSlice/register_slice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// Интерфейсы
interface UserData {
    id?: string;
    name: string;
    email: string;
    role: string;
    disorderType?: string;
    disorderDescription?: string;
    diagnosisDate?: string;
    specialization?: string;
    diploma?: string;
    experience?: string;
    licenseNumber?: string;
    education?: string;
    createdAt?: string;
}

interface RegisterState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    userData: UserData | null;
}

interface RegisterResponse {
    status: string;
    message: string;
    data: UserData;
}

// Начальное состояние
const initialState: RegisterState = {
    isLoading: false,
    error: null,
    success: false,
    userData: null,
};

// Регистрация пользователя
export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData: {
        name: string;
        email: string;
        password: string;
        role: string;
        disorderType?: string;
        disorderDescription?: string;
        diagnosisDate?: string;
        specialization?: string;
        diploma?: string;
        experience?: string;
        licenseNumber?: string;
        education?: string;
    }, { rejectWithValue }) => {
        try {
            // Валидация
            if (!userData.name || userData.name.trim() === '') {
                return rejectWithValue('Имя обязательно для заполнения');
            }
            
            if (!userData.email || !userData.email.includes('@')) {
                return rejectWithValue('Введите корректный email');
            }
            
            if (!userData.password || userData.password.length < 4) {
                return rejectWithValue('Пароль должен содержать минимум 4 символа');
            }
            
            if (!userData.role) {
                return rejectWithValue('Роль обязательна');
            }
            
            // Валидация для пациента
            if (userData.role === 'patient' && !userData.disorderType) {
                return rejectWithValue('Укажите тип расстройства');
            }
            
            // Валидация для врача
            if (userData.role === 'doctor') {
                if (!userData.specialization) {
                    return rejectWithValue('Укажите специализацию');
                }
                if (!userData.diploma) {
                    return rejectWithValue('Загрузите диплом');
                }
            }
            
            // Очищаем данные
            const cleanedData = {
                name: userData.name.trim(),
                email: userData.email.toLowerCase().trim(),
                password: userData.password,
                role: userData.role,
                ...(userData.role === 'patient' && {
                    disorderType: userData.disorderType,
                    disorderDescription: userData.disorderDescription || '',
                    diagnosisDate: userData.diagnosisDate || ''
                }),
                ...(userData.role === 'doctor' && {
                    specialization: userData.specialization,
                    diploma: userData.diploma,
                    experience: userData.experience || '',
                    licenseNumber: userData.licenseNumber || '',
                    education: userData.education || ''
                })
            };
            
            const response = await axios.post<RegisterResponse>(
                'http://localhost:3001/api/v1/register',
                cleanedData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data.status === 'success') {
                return response.data;
            } else {
                return rejectWithValue(response.data.message || 'Ошибка регистрации');
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            if (error.response) {
                return rejectWithValue(error.response.data?.message || 'Ошибка регистрации');
            }
            if (error.request) {
                return rejectWithValue('Сервер не отвечает. Проверьте подключение.');
            }
            return rejectWithValue('Ошибка соединения с сервером');
        }
    }
);

// Обновление роли пользователя
export const updateUserRole = createAsyncThunk(
    'user/updateRole',
    async (roleData: { email: string; role: string }, { rejectWithValue }) => {
        try {
            if (!roleData.email) {
                return rejectWithValue('Email обязателен');
            }
            
            if (!roleData.role) {
                return rejectWithValue('Роль обязательна');
            }
            
            const response = await axios.post(
                'http://localhost:3001/api/v1/update-role',
                roleData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data.status === 'success') {
                return response.data;
            } else {
                return rejectWithValue(response.data.message || 'Failed to update role');
            }
        } catch (error: any) {
            console.error('Update role error:', error);
            if (error.response) {
                return rejectWithValue(error.response.data?.message || 'Ошибка обновления роли');
            }
            return rejectWithValue('Ошибка соединения с сервером');
        }
    }
);

// Получение данных пользователя
export const getHomeUser = createAsyncThunk(
    'home/getHomeUser',
    async (userData: { email: string; name: string; role: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/home', {
                params: userData
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to load data');
        }
    }
);

// Создание слайса
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
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Регистрация
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
                state.userData = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.error = null;
                state.userData = action.payload.data;
                // Сохраняем данные пользователя в localStorage
                if (action.payload.data) {
                    localStorage.setItem('userData', JSON.stringify(action.payload.data));
                    localStorage.setItem('userEmail', action.payload.data.email);
                }
                // Очищаем выбранную роль после регистрации
                localStorage.removeItem('selectedRole');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Registration failed';
                state.success = false;
                state.userData = null;
            })
            
            // Обновление роли
            .addCase(updateUserRole.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.error = null;
                if (state.userData && action.payload?.data) {
                    state.userData.role = action.payload.data.role;
                }
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to update role';
                state.success = false;
            })
            
            // Получение home данных
            .addCase(getHomeUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getHomeUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.error = null;
                state.userData = action.payload?.data || action.payload;
            })
            .addCase(getHomeUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to load data';
                state.success = false;
            });
    },
});

// Экспорт действий
export const { 
    clearError, 
    clearSuccess, 
    resetRegister,
    setUserData 
} = registerSlice.actions;

// Селекторы
export const selectUserData = (state: { register: RegisterState }) => state.register.userData;
export const selectIsLoading = (state: { register: RegisterState }) => state.register.isLoading;
export const selectError = (state: { register: RegisterState }) => state.register.error;
export const selectSuccess = (state: { register: RegisterState }) => state.register.success;

// Экспорт редюсера
export default registerSlice.reducer;