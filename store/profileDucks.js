import Router from 'next/router';
import { notification } from 'antd';
import api from '../api';


export const GET_PROFILE_ACTION_START = 'GET_PROFILE_ACTION_START';
export const GET_PROFILE_ACTION_ERROR = 'GET_PROFILE_ACTION_ERROR';
export const GET_PROFILE_ACTION_SUCCESS = 'GET_PROFILE_ACTION_SUCCESS';


const callGetProfileStart = () => ({
    type: GET_PROFILE_ACTION_START
});

const callGetProfileSuccess = data => ({
    type: GET_PROFILE_ACTION_SUCCESS,
    data
});

const callGetProfileError = error => ({
    type: GET_PROFILE_ACTION_ERROR,
    error
});

const initialState = {
    isLoading: false,
    error: undefined,
    data: undefined
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_ACTION_START:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                data: undefined
            };
        case GET_PROFILE_ACTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                data: action.data
            };
        case GET_PROFILE_ACTION_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                data: undefined
            };
        default:
            return state;
    }
};

export const callGetProfile = () => (dispatch) => {
    dispatch(callGetProfileStart());

    api.getProfile()
        .then((data) => {
            dispatch(callGetProfileSuccess(data));
        })
        .catch((error) => {
            notification.error({
                message: 'Error!',
                description: error.message
            });
            dispatch(callGetProfileError(error));
        });
};
