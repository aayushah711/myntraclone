import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';
import { loadData, saveData, removeData } from '../localStorage';

let initState = {
    isLoading: false,
    error: false,
    message: '',
    isAuth: false,
    accessToken: ''
};

let accessToken = loadData('accessToken');
if (accessToken) {
    initState = {
        ...initState,
        isAuth: true,
        accessToken: accessToken
    };
}

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false
            };

        case LOGIN_USER_SUCCESS:
            saveData('accessToken', payload.accessToken);
            return {
                ...state,
                isLoading: false,
                error: true,
                isAuth: true,
                message: 'Login Successful!',
                accessToken: payload.accessToken
            };

        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: 'Something went wrong...'
            };
        case LOGOUT_USER:
            removeData('accessToken');
            return {
                ...state,
                isAuth: false,
                message: 'Logout Successful!'
            };
        default:
            return state;
    }
};

export default authReducer;
