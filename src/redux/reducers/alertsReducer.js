import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    likeOrUnlikeLoading: false,
    addCommentLoading: false,
    followLoading: false,
    unfollowLoading: false,
    editPostLoading: false,
    deletePostLoading: false,
};

const alertsSlice = createSlice({
    name: 'alertsReducer',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setLikeOrUnlikeLoading(state, action) {
            state.likeOrUnlikeLoading = action.payload;
        },
        setAddCommentLoading(state, action) {
            state.addCommentLoading = action.payload;
        },
        setFollowLoading(state, action) {
            state.followLoading = action.payload;
        },
        setUnFollowLoading(state, action) {
            state.unfollowLoading = action.payload;
        },
        setEditPostLoading(state, action) {
            state.editPostLoading = action.payload;
        },
        setDeletePostLoading(state, action) {
            state.deletePostLoading = action.payload;
        },
    },
});

export const { setLoading, setLikeOrUnlikeLoading, setAddCommentLoading, setFollowLoading, setUnFollowLoading, setEditPostLoading, setDeletePostLoading } = alertsSlice.actions;
export default alertsSlice.reducer;
