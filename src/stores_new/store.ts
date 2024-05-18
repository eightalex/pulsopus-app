import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice.ts';
import departmentsReducer from './departments/slice.ts';
import personDiagramReducer from './personDiagram/slice.ts';
import usersReducer from './users/slice.ts';

export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        departments: departmentsReducer,
        //
        personDiagram: personDiagramReducer,
    }
});