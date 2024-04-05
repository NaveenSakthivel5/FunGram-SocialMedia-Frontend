import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: []
};

const postsSlice = createSlice({
    name: 'postsReducer',
    initialState,
    reducers: {
        setAllPosts(state, action) {
            state.posts = action.payload;
        }
    }
});

export const { setAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
