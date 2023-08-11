import {
    REGISTER_USER,
    LOGIN_USER,
    INITIAL_STATE,
    SET_USER_AUTH,
    SET_USER_DATA,
    PASSWORD_LENGTH,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    PROFILE_INFO,
    PROFILE_INFO_BACK_TO_INITIAL,
    REDIRECT_RESET_PASSWORD
} from '../actions/authAction.jsx';

const initialState = {
    registeredUserInfo: {},
    userLoginInfo: {},
    profileInfo: {},
    user: { success: false },
    isAuthChecked: false,
    password: 0,
    email: null,
    resetInfo: null,
    redirect: true
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDIRECT_RESET_PASSWORD:{
            return {
                ...state,
                redirect: action.redirect
            }
        }
        case PROFILE_INFO: {
            return {
                ...state,
                user: { ...state.user, ...action }
            }
        }
        case PROFILE_INFO_BACK_TO_INITIAL: {
            return {
                ...state,
                user: action.data
            }
        }
        case REGISTER_USER: {
            return {
                ...state,
                registeredUserInfo: { ...state.registeredUserInfo, ...action }
            }
        }
        case LOGIN_USER: {
            return {
                ...state,
                userLoginInfo: { ...state.userLoginInfo, ...action }
            }
        }
        case INITIAL_STATE: {
            return {
                ...state,
                userLoginInfo: initialState.userLoginInfo,
                registeredUserInfo: initialState.registeredUserInfo,
                resetInfo: initialState.resetInfo
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                user: action.data
            }
        }
        case SET_USER_AUTH: {
            return {
                ...state,
                isAuthChecked: action.auth
            }
        }
        case PASSWORD_LENGTH: {
            return {
                ...state,
                password: action.password
            }
        }
        case FORGOT_PASSWORD: {
            return {
                ...state,
                email: action.email
            }
        }
        case RESET_PASSWORD: {
            return {
                ...state,
                resetInfo: {
                    ...state.resetInfo, ...action
                }
            }
        }
        default: {
            return state;
        }
    }
};