import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.ts';

export default configureStore({
    reducer: {
        auth: authReducer,
    }
});