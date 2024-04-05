import { configureStore } from "@reduxjs/toolkit";
import usersReducer  from './reducers/userReducer';
import alertsReducer from "./reducers/alertsReducer";
import postsReducer from "./reducers/postsReducer";


export const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
        alertsReducer:alertsReducer,
        postsReducer:postsReducer,
    },
});

export default store;