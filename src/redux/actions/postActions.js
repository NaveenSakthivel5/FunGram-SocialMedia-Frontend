
import axios from "axios";
import { setLoading } from '../reducers/alertsReducer';
import { setAllPosts } from "../reducers/postsReducer";
import { setLikeOrUnlikeLoading } from "../reducers/alertsReducer";
import { setAddCommentLoading } from "../reducers/alertsReducer"
import { setEditPostLoading } from "../reducers/alertsReducer"
import { setDeletePostLoading } from "../reducers/alertsReducer"
import { message } from 'antd';

export const addPost = (values) => async (dispatch) => {

    values.user = JSON.parse(localStorage.getItem('user'))._id
    values.likes = []
    values.comments = []

    dispatch(setLoading(true));

    try {
        await axios.post('/api/posts/addpost', values);
        dispatch(setLoading(false));
        message.success('Post Added Successfully');
        window.location.href = '/'

    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        message.error('Something went wrong');
    }
};


export const getAllPosts = () => async (dispatch) => {

    dispatch(setLoading(true));

    try {
        const response = await axios.get('/api/posts/getallposts');
        dispatch(setAllPosts(response.data));
        dispatch(setLoading(false));

    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        message.error('Something went wrong');
    }
};

export const likeOrUnlikePost = (values) => async (dispatch) => {

    values.userid = JSON.parse(localStorage.getItem('user'))._id.toString()
    dispatch(setLikeOrUnlikeLoading(true))

    try {
        await axios.post('/api/posts/likeorunlikepost', values)
        dispatch(setLikeOrUnlikeLoading(false))


    } catch (error) {
        console.log(error)
        dispatch(setLikeOrUnlikeLoading(false))
        message.error('something went wrong')
    }

}

export const addComment = (values) => async (dispatch) => {

    values.userid = JSON.parse(localStorage.getItem('user'))._id.toString()
    dispatch(setAddCommentLoading(true))

    try {
        await axios.post('/api/posts/addcomment', values)
        dispatch(setAddCommentLoading(false))
    } catch (error) {
        console.log(error)
        dispatch(setAddCommentLoading(false))
        message.error('something went wrong')
    }
}


export const editPost =(values)=>async dispatch=>{

    dispatch(setEditPostLoading(true))

    try {
        await axios.post('/api/posts/editpost' , values)
        dispatch(setEditPostLoading(false))
        message.success('Post updated successfully')
        
    } catch (error) {
        console.log(error)
        dispatch(setEditPostLoading(false))
        message.error('something went wrong')
    }

}

export const deletePost =(values)=>async dispatch=>{
    
    dispatch(setDeletePostLoading(true))

    try {
        await axios.post('/api/posts/deletepost' , values)
        dispatch(setDeletePostLoading(false))
        message.success('Post deleted successfully')
        
    } catch (error) {
        console.log(error)
        dispatch(setDeletePostLoading(false))
        message.error('something went wrong')
    }

}