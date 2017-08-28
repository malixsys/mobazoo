import axios from 'axios';
import { getAuthInfoFromLocalStorage } from '../utils/auth';

const apiBaseUrl = 'undefined' !== process ? process.env.API_BASE_URL || process.env.NOW_URL || '' : '';
console.log(`Using base url: '${apiBaseUrl}'`);

export const login = ({ email, password }) => axios
    .post(`${apiBaseUrl}/auth/signin`, { email, password })
    .then(response => response.data)
    .catch((loginError) => {
        if (loginError.response && loginError.response.data) {
            return Promise.reject(loginError.response.data);
        }
        // eslint-disable-next-line no-console
        console.error({ loginError });
        return Promise.reject({
            success: false,
            message: 'An error occured'
        });
    });

export const getProfile = () => {
    const auth = getAuthInfoFromLocalStorage();
    if (!auth || !auth.token) {
        return Promise.reject(new Error('Not authenticated!'));
    }
    const config = {
        headers: { 'Authorization': `Bearer ${auth.token}` }
    };
    return axios
        .post(`${apiBaseUrl}/api/me/profile/list`, {}, config)
        .then(response => response.data)
        .catch((loginError) => {
            if (loginError.response && loginError.response.data) {
                return Promise.reject(loginError.response.data);
            }
            // eslint-disable-next-line no-console
            console.error({ loginError });
            return Promise.reject({
                success: false,
                message: 'An error occured'
            });
        });
};

export default {
    login,
    getProfile
};
