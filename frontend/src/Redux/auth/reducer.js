import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER
} from './actionTypes';

const initState = {
    isLoading: false,
    error: false,
    message: '',
    fullName: '',
    mobile: '',
    email: '',
    isAuth: false
};

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false
            };

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: 'User Registered Successfully!',
                fullName: payload.fullName,
                mobile: payload.mobile
            };

        case REGISTER_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: 'Registration was unsuccessful. Please try Again!'
            };

        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false
            };

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: true,
                email: payload.email,
                mobile: payload.mobile,
                fullName: payload.fullName,
                isAuth: true,
                message: 'Login Successful!'
            };

        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: 'Something went wrong...'
            };
        case LOGOUT_USER:
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
