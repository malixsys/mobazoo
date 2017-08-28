import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer as authReducer, authMiddleware } from './authDucks';
import { reducer as profileReducer } from './profileDucks';
import { getAuthInfoFromCookie, getAuthInfoFromLocalStorage } from '../utils/auth';

const reducers = {
    auth: authReducer,
    profile: profileReducer
};

const reducer = combineReducers(reducers);

const middlewares = applyMiddleware(thunkMiddleware, authMiddleware);

const initStore = (initialState = { auth: {} }, { isServer, req }) => {
    if (initialState && initialState.auth) {
        try {
            const auth = isServer ? getAuthInfoFromCookie(req) : getAuthInfoFromLocalStorage();
            if (auth) {
                initialState.auth.data = auth;
            }
        } catch (initStoreError) {
            console.error({ initStoreError });
        }
    }
    return createStore(reducer, initialState, composeWithDevTools(middlewares));
};

export default initStore;
