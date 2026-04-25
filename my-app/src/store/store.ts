import { configureStore } from '@reduxjs/toolkit'
import { default as homeSlice, default as registerUser, default as updateUserRole } from './slices/AuthSlice/register_slice'

// ...
const store = configureStore({
  reducer: {
    auth: registerUser,
    home: homeSlice,
    role: updateUserRole
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store