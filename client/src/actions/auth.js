import {AUTH} from "../constans/actionTypes";
import * as api from '../api';

export const signIn = (formData, navigate) => async  (dispatch) => {
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data});

        navigate('/')
    } catch (error) {
        window.alert(error.response.data.message)
        console.log(error.response.data.message)
    }
}

export const signUp = (formData, navigate) => async  (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, data});

        navigate('/')
    } catch (error) {
        localStorage.setItem('user', error.response.data.message)
        console.log(error.response.data.message)
    }
}