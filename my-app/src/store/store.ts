import { configureStore } from '@reduxjs/toolkit'
import registerUser from './slices/AuthSlice/register_slice'
// ...
const store = configureStore({
  reducer: {
    auth: registerUser
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store