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
    REDIRECT_RESET_PASSWORD,
    GET_USER_DATA
} from '../actions/authAction';
import { TResponseBody, TUser } from '.';
import { TRegisteredInfo, TLoginInfo, TUserInfo } from '../types';

export type TRegisterUser = {
    readonly type: typeof REGISTER_USER;
}
export type TLoginUser = {
    readonly type: typeof LOGIN_USER;
}
export type TGetUserData = {
    readonly type: typeof GET_USER_DATA;
}
export type TInitialStateAuth = {
    readonly type: typeof INITIAL_STATE;
}
export type TSetUserAuth = {
    readonly type: typeof SET_USER_AUTH;
    readonly auth: boolean
}
export type TSetUserData = {
    readonly type: typeof SET_USER_DATA;
    readonly data: TUser | undefined
}
export type TPasswordLength = {
    readonly type: typeof PASSWORD_LENGTH;
    readonly password: number
}
export type TForgotPassword = {
    readonly type: typeof FORGOT_PASSWORD;
    readonly email: string
}
export type TResetPassword = {
    readonly type: typeof RESET_PASSWORD;
}
export type TProfileInfo = {
    readonly type: typeof PROFILE_INFO;
}
export type TProfileInfoBackToInitial = {
    readonly type: typeof PROFILE_INFO_BACK_TO_INITIAL;
    readonly data: TResponseBody<TUser>
}
export type TRedirectResetPassword = {
    readonly type: typeof REDIRECT_RESET_PASSWORD;
    readonly redirect: boolean;
}


export type TAuthActions =
    TRegisterUser
    | TLoginUser
    | TGetUserData
    | TInitialStateAuth
    | TSetUserAuth
    | TSetUserData
    | TPasswordLength
    | TForgotPassword
    | TResetPassword
    | TProfileInfo
    | TProfileInfoBackToInitial
    | TRedirectResetPassword

export type TAuthInitialState = {
    registeredUserInfo: TRegisteredInfo,
    userLoginInfo: TLoginInfo,
    profileInfo: TUserInfo,
    user?: {
        email?: string,
        name?: string,
        password?: string
    },
    isAuthChecked: boolean,
    password: number,
    email: string,
    resetInfo: {
        password: string,
        text: string
    },
    redirect: boolean
}

export type TUserInfoAuth = {
    user: {
        success?: boolean,
        email?: string,
        name?: string,
        password?: string
    }
}