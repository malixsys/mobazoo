import Router from 'next/router';
import { message } from 'antd';
import api from '../api';
import { saveUser, removeUser } from '../utils/auth';
import { notification } from 'antd';

export const TEST_ACTION = 'TEST_ACTION';

export const LOGIN_ACTION_START = 'LOGIN_ACTION_START';
export const LOGIN_ACTION_ERROR = 'LOGIN_ACTION_ERROR';
export const LOGIN_ACTION_SUCCESS = 'LOGIN_ACTION_SUCCESS';
export const LOGOUT_ACTION_SUCCESS = 'LOGOUT_ACTION_SUCCESS';


const callLoginStart = () => ({
    type: LOGIN_ACTION_START
});

const callLoginSuccess = data => ({
    type: LOGIN_ACTION_SUCCESS,
    data
});

const callLogoutSuccess = () => ({
    type: LOGOUT_ACTION_SUCCESS
});

const callLoginError = error => ({
    type: LOGIN_ACTION_ERROR,
    error
});

const initialState = {
    isLoading: false,
    error: undefined,
    data: undefined
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACTION_START:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                data: undefined
            };
        case LOGIN_ACTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                data: action.data
            };
        case LOGOUT_ACTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                data: undefined
            };
        case LOGIN_ACTION_ERROR:
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

export const callLogout = () => (dispatch) => {
    dispatch(callLogoutSuccess());
    Router.push('/login');
};

export const callLogin = ({ email, password }) => (dispatch) => {
    dispatch(callLoginStart());

    api.login({ email, password })
        .then((data) => {
            dispatch(callLoginSuccess(data));
            Router.push('/');
        })
        .catch((error) => {
            notification.error({
                message: 'Error!',
                description: error.message
            });
            dispatch(callLoginError(error));
        });
};

export const authMiddleware = store => next => (action) => {
    switch (action.type) {
        case LOGIN_ACTION_SUCCESS:
            saveUser(action);
            message.info('You have been logged in.');
            break;
        case LOGOUT_ACTION_SUCCESS:
            removeUser();
            message.info('You have been logged out.');
            break;
        case LOGIN_ACTION_ERROR:
            removeUser();
            break;
        default:
    }
    next(action);
};
