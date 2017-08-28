import Cookie from 'js-cookie';

const atob = str => new Buffer(str, 'base64').toString('binary');

export const getAuthInfoFromCookie = (req) => {
    const { headers } = req;

    if (!headers.cookie) {
        return {};
    }
    try {
        const cookie = headers.cookie.split(';').find(c => c.trim().startsWith('auth='));
        if (!cookie) {
            return {};
        }
        const json = cookie.split('=')[1];
        return JSON.parse(atob(json));
    } catch (parseError) {
        console.error(parseError, headers);
        return {};
    }
};

export const getAuthInfoFromLocalStorage = () => {
    const json = window.localStorage.auth;
    return json ? JSON.parse(json) : {};
};

export const removeUser = (action) => {
    window && window.localStorage.setItem('auth', '{}');
    Cookie.remove('auth');
};

export const saveUser = (action) => {
    const auth = JSON.stringify(action.data);
    window && window.localStorage.setItem('auth', auth);
    Cookie.set('auth', btoa(auth));
};
