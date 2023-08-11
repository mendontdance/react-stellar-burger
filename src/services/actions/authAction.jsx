export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_USER_DATA = 'GET_USER_DATA'
export const INITIAL_STATE = 'INITIAL_STATE';
export const SET_USER_AUTH = 'SET_USER_AUTH';
export const SET_USER_DATA = 'SET_USER_DATA';
export const PASSWORD_LENGTH = 'PASSWORD_LENGTH';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const PROFILE_INFO = "PROFILE_INFO";
export const PROFILE_INFO_BACK_TO_INITIAL = 'PROFILE_INFO_BACK_TO_INITIAL';
export const REDIRECT_RESET_PASSWORD = 'REDIRECT_RESET_PASSWORD'

const baseUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then(err => Promise.reject(err));
}

export const registerUser = (userInfo, callback, backToInitialState) => {
    return function (dispatch) {
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

export const loginUser = (userInfo, callback, backToInitialState) => {
    return function (dispatch) {
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
                    backToInitialState()
                }
                dispatch({
                    type: SET_USER_DATA,
                    data: res.user
                })
            })
            .then(callback)
            .catch(err => {
                console.log(err);
            })
    }
}

export const refreshToken = () => {
    return function (dispatch) {
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

const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
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
    return (dispatch) => {
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

export const setUserData = ({ name, email, password }) => {
    return (dispatch) => {
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

export const forgotPassword = (email, callback) => {
    return function (dispatch) {
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
                callback();
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const resetPassword = (password, token, callback) => {
    return function (dispatch) {
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
                callback();
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const logout = () => {
    return (dispatch) => {
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
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUserData())
                .catch((error) => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({
                        type: SET_USER_DATA,
                        data: null
                    });
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