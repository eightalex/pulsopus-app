import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice.ts';

export default configureStore({
    reducer: {
        auth: authReducer,
    }
});