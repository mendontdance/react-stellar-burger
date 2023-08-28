import { baseUrl, checkResponse } from "./fetchAction";
import { TUserInfo, TResponseBody, TUser } from "../types";
export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER';
export const LOGIN_USER: 'LOGIN_USER' = 'LOGIN_USER';
export const GET_USER_DATA: 'GET_USER_DATA' = 'GET_USER_DATA'
export const INITIAL_STATE: 'INITIAL_STATE' = 'INITIAL_STATE';
export const SET_USER_AUTH: 'SET_USER_AUTH' = 'SET_USER_AUTH';
export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';
export const PASSWORD_LENGTH: 'PASSWORD_LENGTH' = 'PASSWORD_LENGTH';
export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const PROFILE_INFO: 'PROFILE_INFO' = "PROFILE_INFO";
export const PROFILE_INFO_BACK_TO_INITIAL: 'PROFILE_INFO_BACK_TO_INITIAL' = 'PROFILE_INFO_BACK_TO_INITIAL';
export const REDIRECT_RESET_PASSWORD: 'REDIRECT_RESET_PASSWORD' = 'REDIRECT_RESET_PASSWORD'

export const registerUser = (
    userInfo: TUserInfo,
    callback: () => void,
    backToInitialState: () => void
) => {
    return function (): Promise<void> {
        return fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": userInfo.email,
                "password": userInfo.password,
                "name": userInfo.text
            })
        })
            .then(checkResponse)
            .then(backToInitialState)
            .then(callback)
            .catch(err => {
                console.log(err);
            })
    }
}

export const loginUser = (
    userInfo: TUserInfo,
    callback: () => void,
    backToInitialState: () => void
) => {
    return function (dispatch: any): Promise<void> {
        return fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": userInfo.email,
                "password": userInfo.password,
            })
        })
            .then(checkResponse)
            .then((res) => {
                if (res.success) {
                    localStorage.setItem('accessToken', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                }
                dispatch({
                    type: SET_USER_DATA,
                    data: res.user
                })
            })
            .then(backToInitialState)
            .then(callback)
            .catch(err => {
                console.log(err);
            })
    }
}

export const refreshToken = () => {
    return function (): Promise<TResponseBody<TUser>> {
        return fetch(`${baseUrl}/auth/token`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken")
            })
        })
            .then(checkResponse)
    }
}

const fetchWithRefresh = async (url: string, options: any): Promise<TResponseBody<TUser>> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData: any = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("accessToken", refreshData.accessToken);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getUserData = () => {
    return (dispatch: any): Promise<string | void> => {
        return fetchWithRefresh(`${baseUrl}/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            if (res.success) {
                dispatch({
                    type: SET_USER_DATA,
                    data: res.user
                })
            } else {
                return Promise.reject("Ошибка данных с сервера");
            }
        });
    };
};

export const setUserData = ({ name, email, password }: TUserInfo) => {
    return (dispatch: any): Promise<string | void> => {
        return fetchWithRefresh(`${baseUrl}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        }).then((res) => {
            if (res.success) {
                dispatch({
                    type: SET_USER_DATA,
                    data: res.user,
                })
            } else {
                return Promise.reject("Ошибка данных с сервера");
            }
        });
    };
};

export const forgotPassword = (email: string, callback: () => void) => {
    return function (): Promise<void> {
        return fetch(`${baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        })
            .then(checkResponse)
            .then(res => {
                console.log(res);
            })
            .then(callback)
            .catch(err => {
                console.log(err);
            })
    }
}

export const resetPassword = (password: string, token: string, callback: () => void) => {
    return function (dispatch: any): Promise<void> {
        return fetch(`${baseUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "token": token
            })
        })
            .then(checkResponse)
            .then(res => {
                console.log(res);
                dispatch({
                    type: PASSWORD_LENGTH,
                    password: password.length
                })
            })
            .then(callback)
            .catch(err => {
                console.log(err);
            })
    }
}

export const logout = () => {
    return (dispatch: any): Promise<void> => {
        return fetch(`${baseUrl}/auth/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": localStorage.getItem("refreshToken")
            })
        })
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch({
                    type: SET_USER_AUTH,
                    auth: true
                });
                dispatch({
                    type: SET_USER_DATA,
                    data: null
                });
            })
            .catch((err) => {
                console.log(err);
            })
    };
};

export const checkUserAuth = () => {
    return (dispatch: any): void => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUserData())
                .catch((error: any) => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({
                        type: SET_USER_DATA,
                        data: null
                    });
                    console.log(error);
                })
                .finally(() => dispatch({
                    type: SET_USER_AUTH,
                    auth: true
                }));
        } else {
            dispatch({
                type: SET_USER_AUTH,
                auth: true
            });
            dispatch({
                type: SET_USER_DATA,
                data: null
            });
        }
    };
};