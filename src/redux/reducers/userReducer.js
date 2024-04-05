import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
};

const usersSlice = createSlice({
    name: 'usersReducer',
    initialState,
    reducers: {
        getAllTheUsers(state, action) {
            state.users = action.payload;
        }
    }
});

export const { getAllTheUsers } = usersSlice.actions;
export default usersSlice.reducer;


