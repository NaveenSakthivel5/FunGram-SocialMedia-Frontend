import axios from "axios";
import { setLoading } from '../reducers/alertsReducer';
import { getAllTheUsers } from "../reducers/userReducer";
import { setFollowLoading, setUnFollowLoading } from "../reducers/alertsReducer";
import { message } from 'antd';

export const userRegister = (values) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        await axios.post('/api/users/register', values);
        dispatch(setLoading(false));
        message.success('User registered successfully');
        window.location.href = '/login';
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        message.error('Something went wrong');
    }
};


export const userLogin = (values) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await axios.post('/api/users/login', values);
        dispatch(setLoading(false));
        message.success('Login success');
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/';
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        message.error('Invalid credentials');
    }
};


export const getAllUsers = (values) =>async (dispatch)=>{
    dispatch(setLoading(true));

    try {
        const response = await axios.get('/api/users/getallusers')
        dispatch(setLoading(false));
        dispatch(getAllTheUsers(response.data))

    } catch (error) {
        console.log(error)
        dispatch(setLoading(false));
        message.error('something went wrong')
    }

}

export const followUser = (values) =>async (dispatch) =>{
    dispatch(setFollowLoading(true))

    try {
        const response = await axios.post('/api/users/followuser' ,values)
        dispatch(setFollowLoading(false))
        message.success('Followed successfully')
        
    } catch (error) {
        console.log(error)
        dispatch(setFollowLoading(false))
        message.error('something went wrong')
    }
}

export const unfollowUser = (values) => async (dispatch) =>{
    dispatch(setUnFollowLoading(true))

    try {
        const response = await axios.post('/api/users/unfollowuser' ,values)
        dispatch(setUnFollowLoading(false))
        message.success('Unfollowed successfully')
        
    } catch (error) {
        console.log(error)
        dispatch(setUnFollowLoading(false))
        message.error('something went wrong')
    }
}

export const editUser = (values) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await axios.post('/api/users/edit', values);
        dispatch(setLoading(false));
        message.success('User Details Updated successfully');
        localStorage.setItem('user' , JSON.stringify(response.data))
        window.location.href = `profile/${response.data._id}`
        
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        message.error('Something went wrong');
    }
};




