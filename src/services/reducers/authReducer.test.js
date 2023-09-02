import { FORGOT_PASSWORD, INITIAL_STATE, LOGIN_USER, PASSWORD_LENGTH, PROFILE_INFO, PROFILE_INFO_BACK_TO_INITIAL, REDIRECT_RESET_PASSWORD, REGISTER_USER, RESET_PASSWORD, SET_USER_AUTH, SET_USER_DATA } from "../actions/authAction";
import { authReducer, initialState } from "./authReducer";

const user = {
    "email": "asdf@asdf.ru",
    "name": "asdf",
    "password": "asdf",
    "type": "PROFILE_INFO",
    "user": undefined,
}

const data = {
    "email": "",
    "name": "",
    "password": "",
}

const checkUser = {
    "email": "",
    "name": "",
    "password": "",
    "type": "REGISTER_USER",
    "user": undefined,
}

describe('test authReducer', () => {
    it('REDIRECT_RESET_PASSWORD', () => {
        expect(authReducer(initialState, ({
            type: REDIRECT_RESET_PASSWORD,
            redirect: true
        }))).toEqual({
            ...initialState,
            redirect: true
        })
    })
    it('PROFILE_INFO', () => {
        expect(authReducer(initialState, ({
            type: PROFILE_INFO,
            user: user.user
        }))).toEqual({
            ...initialState,
            user: { ...user, ...initialState.user }
        })
    })
    it('PROFILE_INFO_BACK_TO_INITIAL', () => {
        expect(authReducer(initialState, ({
            type: PROFILE_INFO_BACK_TO_INITIAL,
            data: data
        }))).toEqual({
            ...initialState,
            user: data
        })
    })
    it('REGISTER_USER', () => {
        expect(authReducer(initialState, ({
            type: REGISTER_USER,
            ...checkUser
        }))).toEqual({
            ...initialState,
            registeredUserInfo: {
                ...checkUser,
                ...initialState.registeredUserInfo
            }
        })
    })
    it('LOGIN_USER', () => {
        expect(authReducer(initialState, ({
            type: LOGIN_USER,
            ...checkUser
        }))).toEqual({
            ...initialState,
            registeredUserInfo: {
                ...checkUser,
                ...initialState.registeredUserInfo
            }
        })
    })
    it('INITIAL_STATE', () => {
        expect(authReducer(initialState, ({
            type: INITIAL_STATE
        }))).toEqual({
            ...initialState,
            userLoginInfo: initialState.userLoginInfo,
            registeredUserInfo: initialState.registeredUserInfo,
            resetInfo: initialState.resetInfo
        })
    })
    it('SET_USER_DATA', () => {
        expect(authReducer(initialState, ({
            type: SET_USER_DATA,
            data: data
        }))).toEqual({
            ...initialState,
            user: { ...data }
        })
    })
    it('SET_USER_AUTH', () => {
        expect(authReducer(initialState, ({
            type: SET_USER_AUTH,
            auth: true
        }))).toEqual({
            ...initialState,
            isAuthChecked: true
        })
    })
    it('PASSWORD_LENGTH', () => {
        expect(authReducer(initialState, ({
            type: PASSWORD_LENGTH,
            password: 8
        }))).toEqual({
            ...initialState,
            password: 8
        })
    })
    it('FORGOT_PASSWORD', () => {
        expect(authReducer(initialState, ({
            type: FORGOT_PASSWORD,
            email: 'asdf@asdf.ru'
        }))).toEqual({
            ...initialState,
            email: 'asdf@asdf.ru'
        })
    })
    it('RESET_PASSWORD', () => {
        expect(authReducer(initialState, ({
            type: RESET_PASSWORD,
            password: '',
            text: '',
        }))).toEqual({
            ...initialState,
            resetInfo: {
                password: '',
                text: '',
                "type": "RESET_PASSWORD",
            }
        })
    })
})